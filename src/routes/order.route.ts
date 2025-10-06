import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createOrderController,
  deleteOrderController,
  getOrderByIdController,
  updateOrderController,
} from "../controllers/orders.controller";

import { ROLES } from "../types";

const orderRouter = Router();

orderRouter.use(withAuth(ROLES.USER));

orderRouter.get("/:id", getOrderByIdController);
orderRouter.post("/", createOrderController);
orderRouter.delete("/:id", deleteOrderController);
orderRouter.put("/:id", updateOrderController);

export default orderRouter;
