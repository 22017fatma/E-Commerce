import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createAddressController,
  deleteAddressController,
  getAddressByIdController,
  getAddressesController,
  updateAddressController,
} from "../controllers/address.controller";
import { ROLES } from "../types";

const addressRouter = Router();

addressRouter.use(withAuth(ROLES.USER));

addressRouter.get("/", getAddressesController);
addressRouter.get("/:id", getAddressByIdController);
addressRouter.post("/", createAddressController);
addressRouter.delete("/:id", deleteAddressController);
addressRouter.put("/:id", updateAddressController);

export default addressRouter;
