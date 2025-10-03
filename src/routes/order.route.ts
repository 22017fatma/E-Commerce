import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createOrderController,
  deleteOrderController,
  getOrderByIdController,
  getOrdersController,
  updateOrderController
} from "../controllers/orders.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const orderRouter = Router();

orderRouter.use(withAuth(ROLES.USER));

orderRouter.get("/", authorizeUserOrAdmin, getOrdersController);
orderRouter.post("/", authorizeUserOrAdmin, createOrderController);
orderRouter.delete("/:id", authorizeUserOrAdmin, deleteOrderController);
orderRouter.put("/:id", authorizeUserOrAdmin, updateOrderController);

export default orderRouter;