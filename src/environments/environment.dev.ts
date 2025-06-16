import { Utils } from "../utils/Utils";
import { Environment } from "./environment";

Utils.dotenvConfig();

export const DevEnvironment: Environment = {
  db_url: process.env.DEV_DB_URL,

  jwt_secret_key: process.env.DEV_JWT_SECRET_KEY,
  jwt_refresh_secret_key: process.env.DEV_JWT_REFRESH_SECRET_KEY,

  redis: {
    username: process.env.SERVER_REDIS_USERNAME,
    password: process.env.SERVER_REDIS_PASSWORD,
    host: process.env.SERVER_REDIS_HOST,
    port: parseInt(process.env.SERVER_REDIS_PORT),
  },
};
