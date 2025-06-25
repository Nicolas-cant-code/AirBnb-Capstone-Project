import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserValidators } from "../validators/UserValidator";
import { GlobalMiddleware } from "../middleware/GlobalMiddlewate";

class UserRouter {
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
      "/login",
      UserValidators.login(),
      GlobalMiddleware.checkError,
      UserController.login
    );
    this.router.get(
      "/get/host",
      GlobalMiddleware.checkError,
      UserController.getHost
    );
  }
  postRoutes() {
    this.router.post(
      "/signup",
      UserValidators.validateUserSignup(),
      GlobalMiddleware.checkError,
      UserController.signup
    );
    this.router.post(
      "/logout",
      GlobalMiddleware.auth,
      GlobalMiddleware.decodeRefreshToken,
      UserController.logout
    );
  }
  patchRoutes() {}
  putRoutes() {}
  deleteRoutes() {}
}

export default new UserRouter().router;
