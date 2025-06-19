import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddlewate";
import { ReservationController } from "../controllers/ReservationController";
import { ReservationValidator } from "../validators/ReservationValidator";

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
    this.router.get("/get/reservations", ReservationController.getReservation);
  }
  postRoutes() {
    this.router.post(
      "/create",
      ReservationValidator.createReservation(),
      GlobalMiddleware.checkError,
      ReservationController.createReservation
    );
  }
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {
    this.router.get("/delete", ReservationController.deleteReservation);
  }
}

export default new LocationRouter().router;
