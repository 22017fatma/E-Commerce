import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  deleteUserController,
  getUserByIdController,
} from "../controllers/user.controller";
import { withAuth } from "../middlewares/auth";

const userRoutes = Router();

userRoutes.get("/", withAuth("user", "admin"), getAllUsersController);
userRoutes.get("/:id", withAuth("user", "admin"), getUserByIdController);

userRoutes.post("/", withAuth("admin"), createUserController);
userRoutes.delete("/:id", withAuth("admin"), deleteUserController);

export default userRoutes;
