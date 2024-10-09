import { Router } from "express";

import AuthController from "../controllers/users-controllers.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";

const AuthRouter = Router();

AuthRouter.get("/", AuthController.getAllUsers);
AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/logout", AuthController.logout);
AuthRouter.get("/:q", verifyAccessToken, AuthController.getUserByName);
AuthRouter.delete("/:id", verifyAccessToken, AuthController.deleteUserById);
AuthRouter.put("/:id", verifyAccessToken, AuthController.updateUserById);

export default AuthRouter;
