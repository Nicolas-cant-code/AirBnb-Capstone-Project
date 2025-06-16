import { Router } from "express";
import { LocationController } from "../controllers/LocationController";

class LocationRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes() {
    this.router.get("/get/locations", LocationController.getAllLocationNames);
  }
  postRoutes() {}
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {}
}

export default new LocationRouter().router;
