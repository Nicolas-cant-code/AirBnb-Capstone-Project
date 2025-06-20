import Listing from "../models/Listing";
import { validationResult } from "express-validator";
import Reservation from "../models/Reservation";

export class ListingController {
  static async createListing(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const listing = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least 1 image is required" });
    }

    const paths = req.files?.map((file) => file.path) || [];

    try {
      let listingData = {
        listing_name: listing.listing_name,
        service: listing.service,
        cleaning: listing.cleaning,
        location: listing.location,
        type: listing.type,
        description: listing.description,
        price: parseInt(listing.price),
        bedrooms: parseInt(listing.bedrooms),
        bathrooms: parseInt(listing.bathrooms),
        images: paths,
        amenities:
          (listing.amenities || "").split(",").map((s) => s.trim()) || [],
        host_id: listing.host_id,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const listingDoc = await new Listing(listingData).save();

      res.send(listingDoc);
    } catch (e) {
      next(e);
    }
  }

  static async getListing(req, res, next) {
    try {
      const host_id = req.query.host_id;

      if (!host_id) {
        return res.status(400).json({ message: "Host ID is required" });
      }

      const listing = await Listing.find({ host_id });

      if (!listing) {
        return res.status(404).json({ message: "No Listings were found" });
      }
      res.send(listing);
    } catch (e) {
      next(e);
    }
  }

  static async deleteListing(req, res, next) {
    try {
      const listing_id = req.query.listing_id;

      if (!listing_id) {
        return res.status(400).json({ message: "Listing ID is required" });
      }

      await Listing.findByIdAndDelete(listing_id);

      res.send({ message: "Listing deleted successfully" });
    } catch (e) {
      next(e);
    }
  }

  static async updateListing(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const listing = req.body;

    const paths = req.files?.map((file) => file.path) || [];

    let existingImages = req.body.existingImages || [];
    if (typeof existingImages === "string") {
      existingImages = [existingImages];
    }

    const allImages = [...existingImages, ...paths];

    if (allImages.length === 0) {
      return res.status(400).json({ message: "At least 1 image is required" });
    }

    try {
      let listingData = {
        listing_name: listing.listing_name,
        location: listing.location,
        type: listing.type,
        service: listing.service,
        cleaning: listing.cleaning,
        description: listing.description,
        price: parseInt(listing.price),
        bedrooms: parseInt(listing.bedrooms),
        bathrooms: parseInt(listing.bathrooms),
        images: allImages,
        amenities:
          (listing.amenities || "").split(",").map((s) => s.trim()) || [],
        updated_at: new Date(),
      };

      const updatedListing = await Listing.findByIdAndUpdate(
        listing._id,
        listingData,
        { new: true }
      );

      if (!updatedListing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      res.json(updatedListing);
    } catch (e) {
      next(e);
    }
  }

  static async searchForListing(req, res, next) {
    const guests = parseInt(req.query.guests);
    const hotel = req.query.hotel;
    const checkIn = req.query.check_in;
    const checkOut = req.query.check_out;

    try {
      if (!guests || !hotel || !checkIn || !checkOut) {
        return res
          .status(400)
          .json({ message: "All search parameters are required" });
      }

      let listings = await Listing.find({
        type: hotel,
        $expr: {
          $and: [
            { $gte: [{ $multiply: ["$bedrooms", 2] }, guests] }, // bedrooms * 2 >= guests
            { $lte: ["$bedrooms", guests] }, // bedrooms <= guests
          ],
        },
      });

      if (listings.length === 0) {
        return res
          .status(404)
          .json({ message: "No listings support that amount of guests" });
      }

      const reservationDates = await Reservation.find({
        listing_id: { $in: listings.map((listing) => listing._id) },
      });

      listings = listings.filter((listing) => {
        return !reservationDates.some((reservation) => {
          return (
            reservation.listing_id.toString() === listing._id.toString() &&
            ((new Date(checkIn) >= new Date(reservation.check_in) &&
              new Date(checkIn) <= new Date(reservation.check_out)) ||
              (new Date(checkOut) >= new Date(reservation.check_in) &&
                new Date(checkOut) <= new Date(reservation.check_out)))
          );
        });
      });

      if (listings.length === 0) {
        return res.status(404).json({
          message:
            "No listings available with those dates. Please select different dates",
        });
      }

      res.json(listings);
    } catch (e) {
      next(e);
    }
  }
}
