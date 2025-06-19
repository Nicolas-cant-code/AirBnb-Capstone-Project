import Listing from "../models/Listing";
import { validationResult } from "express-validator";

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
}
