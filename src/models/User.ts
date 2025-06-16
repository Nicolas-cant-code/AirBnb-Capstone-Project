import * as mongoose from "mongoose";
import { model } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },

  username: { type: String, required: true },
  type: { type: String, required: true },

  password: { type: String, required: true },

  profile_pic: { type: String, required: false },

  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
});

const User = model("users", userSchema);

export default User;
