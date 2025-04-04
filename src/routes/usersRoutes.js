import express from "express";
import UsersController from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/auth.js";

const routes = express.Router();

routes.post("/login", UsersController.login);
routes.post("/register", UsersController.createUser);

routes.get("/users", authMiddleware, UsersController.getAllUsers);
routes.get("/users/id/:id", authMiddleware, UsersController.getUserById);
routes.put("/users/id/:id", authMiddleware, UsersController.updateUser);
routes.delete("/users/id/:id", authMiddleware, UsersController.deleteUser);

routes.get("/:username", authMiddleware, UsersController.getUserByUsername);

export default routes;
