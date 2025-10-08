import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  getProductImageByIdController,
  getProductImagesController,
} from "../controllers/product_img.controller";
import { ROLES } from "../types";

const productImgRouter = Router();

productImgRouter.use(withAuth(ROLES.USER));

productImgRouter.get("/", getProductImagesController);
productImgRouter.get("/:id", getProductImageByIdController);

export default productImgRouter;
