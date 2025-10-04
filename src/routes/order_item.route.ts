import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createOrderItemController,
  deleteOrderItemController,
  getOrderItemByIdController,
  getOrderItemsController,
  updateOrderItemController,
} from "../controllers/order_item.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const orderItemRouter = Router();

orderItemRouter.use(withAuth(ROLES.USER));

orderItemRouter.get("/", authorizeUserOrAdmin, getOrderItemsController);
orderItemRouter.get("/:id", authorizeUserOrAdmin, getOrderItemByIdController);
orderItemRouter.post("/", authorizeUserOrAdmin, createOrderItemController);
orderItemRouter.delete("/:id", authorizeUserOrAdmin, deleteOrderItemController);
orderItemRouter.put("/:id", authorizeUserOrAdmin, updateOrderItemController); 

export default orderItemRouter;

