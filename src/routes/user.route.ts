import { Router } from "express";
import {
  deleteUserController,
  updateUserController,
} from "../controllers/user.controller";
import { withAuth } from "../middlewares/auth";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const userRoutes = Router();



userRoutes.put("/:id", withAuth(ROLES.USER), authorizeUserOrAdmin, updateUserController);
userRoutes.delete("/:id", withAuth(ROLES.USER),authorizeUserOrAdmin, deleteUserController);

export default userRoutes;
