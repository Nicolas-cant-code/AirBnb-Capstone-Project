import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Multer from "multer";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "airbnb_images",
      allowed_formats: ["jpg", "png", "jpeg"],
      transformation: [{ width: 800, height: 600, crop: "limit" }],
    };
  },
});

export const cloudinaryUploader = Multer({ storage });
