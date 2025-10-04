import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createAddressController,
  deleteAddressController,
  getAddressByIdController,
  getAddressesController,
  updateAddressController,
} from "../controllers/address.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const addressRouter = Router();

addressRouter.use(withAuth(ROLES.USER));

addressRouter.get("/", authorizeUserOrAdmin, getAddressesController);
addressRouter.get("/:id", authorizeUserOrAdmin, getAddressByIdController);
addressRouter.post("/", authorizeUserOrAdmin, createAddressController);
addressRouter.delete("/:id", authorizeUserOrAdmin, deleteAddressController);
addressRouter.put("/:id", authorizeUserOrAdmin, updateAddressController);   

export default addressRouter;