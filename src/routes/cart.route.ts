import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createCartController,
  deleteCartController,
  getCartsController,
  updateCartController,
} from "../controllers/carts.controller";
import { ROLES } from "../types";

const cartRouter = Router();

cartRouter.use(withAuth(ROLES.USER));

cartRouter.get("/", getCartsController);
cartRouter.post("/", createCartController);
cartRouter.delete("/:id", deleteCartController);
cartRouter.put("/:id", updateCartController);

export default cartRouter;
