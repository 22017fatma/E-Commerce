import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createProductCategoryController,
  deleteProductCategoryController,
  getProductCategoryByIdController,
  getProductCategoriesController,
  updateProductCategoryController
} from "../controllers/product_category.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const productCategoryRouter = Router();

productCategoryRouter.use(withAuth(ROLES.USER));

productCategoryRouter.get("/", authorizeUserOrAdmin, getProductCategoriesController);
productCategoryRouter.get("/:id", authorizeUserOrAdmin, getProductCategoryByIdController);
productCategoryRouter.post("/", authorizeUserOrAdmin, createProductCategoryController);
productCategoryRouter.delete("/:id", authorizeUserOrAdmin, deleteProductCategoryController);
productCategoryRouter.put("/:id", authorizeUserOrAdmin, updateProductCategoryController); 

export default productCategoryRouter;