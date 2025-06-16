import * as mongoose from "mongoose";
import { model } from "mongoose";

const listingSchema = new mongoose.Schema({
  listing_name: { type: String, required: true, unique: true },
  host_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  description: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },

  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },

  images: { type: [String], required: true },
  amenities: { type: [String], required: true },

  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
});

const Listing = model("listings", listingSchema);

export default Listing;
