import { Router } from "express";
import {
  deleteUserController,
  updateUserController,
} from "../controllers/user.controller";
import { withAuth } from "../middlewares/auth";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const userRoutes = Router();

userRoutes.use(withAuth(ROLES.USER));



userRoutes.put("/:id",  authorizeUserOrAdmin, updateUserController);
userRoutes.delete("/:id",authorizeUserOrAdmin, deleteUserController);

export default userRoutes;
