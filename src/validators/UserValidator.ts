import { body, query } from "express-validator";
import User from "../models/User";

export class UserValidators {
  static validateUserSignup() {
    return [
      body("username", "Username is required").isString(),
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email })
            .then((user) => {
              if (user) {
                throw "Email already in use";
              } else {
                return true;
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        }),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 6, max: 20 })
        .withMessage("Password must be between 6 and 20 characters"),
      body("type", "Type is required").isString(),
    ];
  }

  static login() {
    return [
      query("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email })
            .then((user) => {
              if (user) {
                if (user.type == "guest" || user.type == "host") {
                  req.user = user;
                  return true;
                } else {
                  throw "You are not an authorized user";
                }
              } else {
                throw "User doesn't exist";
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        }),
      query("password", "Password is required").isAlphanumeric(),
    ];
  }
}
