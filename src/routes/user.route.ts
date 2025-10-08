import { Router } from "express";
import {
  deleteUserController,
  updateUserController,
  getUserByIdController,
} from "../controllers/user.controller";
import { withAuth } from "../middlewares/auth";
import { ROLES } from "../types";

const userRoutes = Router();

userRoutes.use(withAuth(ROLES.USER));

userRoutes.get("/:id", getUserByIdController);
userRoutes.put("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
