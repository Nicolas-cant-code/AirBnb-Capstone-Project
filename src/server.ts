import express from "express";
import * as mongoose from "mongoose";
import { getEnvironmentVariables } from "./environments/environment";
import { Utils } from "./Utils/Utils";

export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigs() {
    this.dotenvConfig();
    this.connectToMongoDB();
  }

  dotenvConfig() {
    Utils.dotenvConfig();
  }

  // Example route
  setRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Welcome to the Airbnb Capstone Project API!");
    });
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

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({ message: "Not Found", status: 404 });
    });
  }

  handleErrors() {
    this.app.use(
      (
        error: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const errorStatus = req.errorStatus || 500;
        res.status(errorStatus).json({
          message: error.message || "Something went wrong. Please try again.",
          status: errorStatus,
        });
      }
    );
  }

  // Start the server
  // this.app.listen(process.env.PORT, () => {
  //   console.log(`Server is running on http://localhost:${process.env.PORT}`);
  // });
}
