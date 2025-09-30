import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
} from "../controllers/user.controller";
import { withAuth } from "../middlewares/auth";

const userRoutes = Router();

userRoutes.get("/", withAuth("user", "admin"), getAllUsers);

userRoutes.post("/", withAuth("admin"), createUser);
userRoutes.delete("/:id", withAuth("admin"), deleteUser);

export default userRoutes;
