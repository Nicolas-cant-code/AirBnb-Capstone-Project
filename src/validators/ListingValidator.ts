import { body, query } from "express-validator";
import User from "../models/User";

export class ListingValidator {
  static createListing() {
    return [
      body("listing_name", "Listing Name is required")
        .isString()
        .custom((listing_name, { req }) => {
          return User.findOne({ listing_name: listing_name })
            .then((listing) => {
              if (listing) {
                throw "Listing name already exists. Please choose a different name.";
              } else {
                req.listing_name = listing_name;
                return true;
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        }),
      body("type", "Type is required").isString(),
      body("price", "Price is required").isNumeric(),
      body("location", "Location is required").isString(),
      body("description", "Description is required").isString(),
      body("bedrooms", "Atleast 1 bedroom is required").isNumeric(),
      body("bathrooms", "Atleast 1 bathroom is required").isNumeric(),
      body("cleaning", "Cleaning is either true or false").isBoolean(),
      body("service", "Service is either true or false").isBoolean(),
    ];
  }
}
