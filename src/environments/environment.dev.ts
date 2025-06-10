import { Utils } from "../Utils/Utils";
import { Environment } from "./environment";

Utils.dotenvConfig();

export const DevEnvironment: Environment = {
  db_url: process.env.DEV_DB_URL || "mongodb://localhost:27017/airbnb", // Fallback value
};
