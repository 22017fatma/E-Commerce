import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createCartItemController,
  deleteCartItemController,
  getCartItemsController,
  getCartItemByIdController,
  updateCartItemController,
} from "../controllers/cart_item.controller";
import { ROLES } from "../types";

const cart_itemRouter = Router();

cart_itemRouter.use(withAuth(ROLES.USER));

cart_itemRouter.get("/", getCartItemsController);
cart_itemRouter.get("/:id", getCartItemByIdController);
cart_itemRouter.post("/", createCartItemController);
cart_itemRouter.delete("/:id", deleteCartItemController);
cart_itemRouter.put("/:id", updateCartItemController);

export default cart_itemRouter;
