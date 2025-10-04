import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createProductImageController,
  deleteProductImageController,
  getProductImageByIdController,
  getProductImagesController,
  updateProductImageController,
} from "../controllers/product_img.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const productImgRouter = Router();

productImgRouter.use(withAuth(ROLES.USER));

productImgRouter.get("/", authorizeUserOrAdmin, getProductImagesController);
productImgRouter.get("/:id", authorizeUserOrAdmin, getProductImageByIdController);
productImgRouter.post("/", authorizeUserOrAdmin, createProductImageController);
productImgRouter.delete("/:id", authorizeUserOrAdmin, deleteProductImageController);
productImgRouter.put("/:id", authorizeUserOrAdmin, updateProductImageController);

export default productImgRouter;