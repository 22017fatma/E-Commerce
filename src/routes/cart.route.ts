import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createCartController,
  deleteCartController,
  getCartsController,
  getCartByIdController,
  updateCartController,
} from "../controllers/carts.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const cartRouter = Router();

cartRouter.use(withAuth(ROLES.USER));

cartRouter.get("/", authorizeUserOrAdmin, getCartsController);
cartRouter.post("/", authorizeUserOrAdmin, createCartController);
cartRouter.delete("/:id", authorizeUserOrAdmin, deleteCartController);
cartRouter.put("/:id", authorizeUserOrAdmin, updateCartController);

export default cartRouter;