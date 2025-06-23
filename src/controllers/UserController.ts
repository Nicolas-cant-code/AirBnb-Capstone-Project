import { validationResult } from "express-validator";
import User from "../models/User";
import { Utils } from "../utils/Utils";
import { JWT } from "../utils/Jwt";
import { Redis } from "../utils/Redis";

export class UserController {
  static async signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;

    try {
      const hash = await Utils.encryptPassword(password);

      const data = {
        email,
        password: hash,
        username,
        type,
      };
      const user = await new User(data).save();
      const user_data = {
        _id: user._id,
        email: user.email,
        username: user.username,
        profile_pic: user.profile_pic || null,
        type: user.type,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
      const payload = {
        email: user.email,
        type: user.type,
      };
      const access_token = JWT.jwtSign(payload, user._id);
      const refresh_token = await JWT.jwtSignRefreshToken(payload, user._id);
      res.json({
        token: access_token,
        refresh_token: refresh_token,
        user: user_data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const user = await User.findOne({
      email: req.query.email,
    });
    const password = req.query.password;

    const data = {
      password,
      encrypt_password: user.password,
    };

    try {
      await Utils.comparePassword(data);
      const payload = {
        // aud: user._id,
        email: user.email,
        type: user.type,
      };
      const access_token = JWT.jwtSign(payload, user._id);
      const refresh_token = await JWT.jwtSignRefreshToken(payload, user._id);

      const user_data = {
        _id: user._id,
        email: user.email,
        username: user.username,
        profile_pic: user.profile_pic || null,
        type: user.type,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      res.json({
        token: access_token,
        refresh_token: refresh_token,
        user: user_data,
      });
    } catch (err) {
      next(err);
    }

    // res.send(req.user);
  }

  static async logout(req, res, next) {
    const decoded_data = req.user;

    try {
      if (decoded_data) {
        await Redis.delKey(decoded_data.aud);
        res.json({ sucess: true });
      } else {
        req.errorStatus = 403;
        throw new Error("Access is Forbiden");
      }
    } catch (e) {
      req.errorStatus = 403;
      next(e);
    }
  }
}
