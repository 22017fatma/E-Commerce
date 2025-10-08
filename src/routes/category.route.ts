import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  getCategoriesController,
  updateCategoryController,
} from "../controllers/categories.controller";
import { ROLES } from "../types";

const catogryRouter = Router();
catogryRouter.use(withAuth(ROLES.USER));

catogryRouter.get("/categories", getCategoriesController);
catogryRouter.get("/:id", getCategoryByIdController);

export default catogryRouter;
