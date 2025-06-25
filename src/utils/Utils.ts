import * as Bcrypt from "bcrypt";
import Multer from "multer";
import * as dotenv from "dotenv";

const storageOptions = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/Airbnbsimages");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export class Utils {
  public multer = Multer({
    storage: storageOptions,
    fileFilter: fileFilter,
  });

  static encryptPassword(password: any) {
    return new Promise((resolve, reject) => {
      Bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  static comparePassword(data: { password: string; encrypt_password: string }) {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(data.password, data.encrypt_password, (err, isMatch) => {
        if (err) {
          reject(err);
        } else if (!isMatch) {
          reject(new Error("User and password do not match"));
        } else {
          resolve(true);
        }
      });
    });
  }

  static dotenvConfig() {
    dotenv.config({ path: ".env" });
  }
}
