import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createProductImageController,
  deleteProductImageController,
  getProductImageByIdController,
  getProductImagesController,
  updateProductImageController,
} from "../controllers/product_img.controller";
import { ROLES } from "../types";

const productImgRouter = Router();

productImgRouter.use(withAuth(ROLES.USER));

productImgRouter.get("/", getProductImagesController);
productImgRouter.get("/:id", getProductImageByIdController);
productImgRouter.post("/", createProductImageController);
productImgRouter.delete("/:id", deleteProductImageController);
productImgRouter.put("/:id", updateProductImageController);

export default productImgRouter;
