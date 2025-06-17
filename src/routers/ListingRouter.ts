import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddlewate";
import { ListingController } from "../controllers/ListingController";
import { ListingValidator } from "../validators/ListingValidator";
import { Utils } from "../utils/Utils";

class ListingRouter {
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
    this.router.get(
      "/get/listings",
      GlobalMiddleware.checkError,
      ListingController.getListing
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      new Utils().multer.array("images", 6),
      ListingValidator.createListing(),
      GlobalMiddleware.checkError,
      ListingController.createListing
    );
  }
  patchRoutes() {}
  putRoutes() {
    this.router.put(
      "/update",
      new Utils().multer.array("images", 6),
      ListingValidator.createListing(),
      GlobalMiddleware.checkError,
      ListingController.updateListing
    );
  }

  deleteRoutes() {
    this.router.get(
      "/delete",
      // GlobalMiddleware.auth,
      // GlobalMiddleware.hostRole,
      ListingController.deleteListing
    );
  }
}

export default new ListingRouter().router;
