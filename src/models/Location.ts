import * as mongoose from "mongoose";
import { model } from "mongoose";

const locationSchema = new mongoose.Schema({
  location: { type: String, required: true, unique: true },
});

const Location = model("locations", locationSchema);

export default Location;
