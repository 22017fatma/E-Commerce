import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createOrderItemController,
  deleteOrderItemController,
  getOrderItemByIdController,
  getOrderItemsController,
  updateOrderItemController,
} from "../controllers/order_item.controller";
import { ROLES } from "../types";

const orderItemRouter = Router();

orderItemRouter.use(withAuth(ROLES.USER));

orderItemRouter.get("/", getOrderItemsController);
orderItemRouter.get("/:id", getOrderItemByIdController);
orderItemRouter.post("/", createOrderItemController);
orderItemRouter.delete("/:id", deleteOrderItemController);
orderItemRouter.put("/:id", updateOrderItemController);

export default orderItemRouter;
