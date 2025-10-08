import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createProductCategoryController,
  deleteProductCategoryController,
  getProductCategoryByIdController,
  getProductCategoriesController,
  updateProductCategoryController,
} from "../controllers/product_category.controller";
import { ROLES } from "../types";

const productCategoryRouter = Router();

productCategoryRouter.use(withAuth(ROLES.USER));

productCategoryRouter.get("/", getProductCategoriesController);
productCategoryRouter.get("/:id", getProductCategoryByIdController);


export default productCategoryRouter;
