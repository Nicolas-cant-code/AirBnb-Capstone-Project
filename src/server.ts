import * as express from "express";
import * as mongoose from "mongoose";
import { getEnvironmentVariables } from "./environments/environment";
import * as bodyParser from "body-parser";
import cors from "cors";
import { Utils } from "./utils/Utils";
import UserRouter from "./routers/UserRouter";
import { Redis } from "./utils/Redis";
import LocationRouter from "./routers/LocationRouter";
import ListingRouter from "./routers/ListingRouter";
import ReservationRouter from "./routers/ReservationRouter";

export class Server {
  public app: express.Application = express.default();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigs() {
    this.dotenvConfig();
    this.connectToMongoDB();
    this.connectRedis();
    this.allowCors();
    this.conigBodyParser();
    this.setImageUpload();
  }

  dotenvConfig() {
    Utils.dotenvConfig();
  }

  connectToMongoDB() {
    mongoose
      .connect(getEnvironmentVariables().db_url, {
        tls: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => console.log("Error connecting to Database:", error));
  }

  connectRedis() {
    Redis.connectToRedis();
  }

  conigBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  allowCors() {
    this.app.use(cors());
  }

  setRoutes() {
    this.app.use("/api/user/", UserRouter);
    this.app.use("/api/location/", LocationRouter);
    this.app.use("/api/listing/", ListingRouter);
    this.app.use("/api/reservation/", ReservationRouter);
  }

  setImageUpload() {
    this.app.use(
      "/public/assets/Airbnbsimages",
      express.static("public/assets/Airbnbsimages")
    );
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({ message: "Not Found", status: 404 });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "Something went wrong. Please try again.",
        status: errorStatus,
      });
    });
  }
}
