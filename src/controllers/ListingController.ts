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
}
