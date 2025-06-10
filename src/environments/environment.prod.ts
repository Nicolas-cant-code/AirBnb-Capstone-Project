import { Utils } from "../Utils/Utils";
import { Environment } from "./environment";

Utils.dotenvConfig();

export const ProdEnvironment: Environment = {
  db_url: process.env.PROD_DB_URL || "mongodb://localhost:27017/airbnb", // Fallback value
};
