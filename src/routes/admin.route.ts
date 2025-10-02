import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  addProductController,
  deleteProductController,
} from "../controllers/adminProduct.controller";
import {
  createUserController,
  getAllUsersController,
  deleteUserController,
  getUserByIdController,
  updateUserController,
} from "../controllers/user.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const adminRouter = Router();

adminRouter.use(withAuth(ROLES.ADMIN));
//product
adminRouter.post("/", addProductController);
adminRouter.delete("/:id", deleteProductController);
//user
adminRouter.get("/", authorizeUserOrAdmin, getAllUsersController);
adminRouter.get("/:id", authorizeUserOrAdmin, getUserByIdController);
adminRouter.post("/user", authorizeUserOrAdmin, createUserController);
adminRouter.delete("/user/:id", authorizeUserOrAdmin, deleteUserController);
adminRouter.put("/user/:id", authorizeUserOrAdmin, updateUserController);

export default adminRouter;
