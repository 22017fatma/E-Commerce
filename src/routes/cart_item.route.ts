import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createCartItemController,
  deleteCartItemController,
  getCartItemsController,
  getCartItemByIdController,  
  updateCartItemController
} from "../controllers/cart_item.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const cart_itemRouter = Router();

cart_itemRouter.use(withAuth(ROLES.USER));

cart_itemRouter.get("/", authorizeUserOrAdmin, getCartItemsController);
cart_itemRouter.get("/:id", authorizeUserOrAdmin, getCartItemByIdController);
cart_itemRouter.post("/", authorizeUserOrAdmin, createCartItemController);
cart_itemRouter.delete("/:id", authorizeUserOrAdmin, deleteCartItemController);
cart_itemRouter.put("/:id", authorizeUserOrAdmin, updateCartItemController); 
 
export default cart_itemRouter;