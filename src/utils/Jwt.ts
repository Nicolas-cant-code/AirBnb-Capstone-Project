import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/environment";
import { Redis } from "./Redis";

export class JWT {
  static jwtSign(payload, userId) {
    // Jwt.gen_secret_key();
    return Jwt.sign(payload, getEnvironmentVariables().jwt_secret_key, {
      expiresIn: "1h",
      audience: userId.toString(),
      issuer: "nicw.com",
    });
  }

  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Jwt.verify(
        token,
        getEnvironmentVariables().jwt_secret_key,
        (err, decoded) => {
          if (err) {
            reject(err);
          } else if (!decoded) {
            reject(new Error("User is not Authorized"));
          } else {
            resolve(decoded);
          }
        }
      );
    });
  }

  static async jwtSignRefreshToken(
    payload,
    userId,
    redis_ex: number = 60 * 60 * 24 * 180 // 180 days in seconds
  ) {
    try {
      const refresh_token = Jwt.sign(
        payload,
        getEnvironmentVariables().jwt_refresh_secret_key,
        {
          expiresIn: "180d",
          audience: userId.toString(),
          issuer: "nicw.com",
        }
      );
      // set refresh token in redis
      await Redis.setValue(userId.toString(), refresh_token, redis_ex);
      return refresh_token;
    } catch (error) {
      throw error;
    }
  }

  static jwtVerifyRefreshToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Jwt.verify(
        token,
        getEnvironmentVariables().jwt_refresh_secret_key,
        (err, decoded) => {
          if (err) {
            reject(err);
          } else if (!decoded) {
            reject(new Error("User is not Authorized"));
          } else {
            // get tokens to match in redis db
            const user: any = decoded;
            Redis.getValue(user.aud)
              .then((value) => {
                if (value === token) {
                  resolve(decoded);
                }
              })
              .catch((e) => {
                reject(e);
              });
            resolve(decoded);
          }
        }
      );
    });
  }
}
