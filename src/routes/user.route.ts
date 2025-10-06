import { Router } from "express";
import {
  deleteUserController,
  updateUserController,
  getUserByIdController,
  getAllUsersController
} from "../controllers/user.controller";
import { withAuth } from "../middlewares/auth";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const userRoutes = Router();

userRoutes.use(withAuth(ROLES.USER));

userRoutes.get("/users", authorizeUserOrAdmin, getAllUsersController);
userRoutes.get("/users/:id", authorizeUserOrAdmin, getUserByIdController);
userRoutes.put("/users/:id",  authorizeUserOrAdmin, updateUserController);
userRoutes.delete("/users/:id",authorizeUserOrAdmin, deleteUserController);

export default userRoutes;
