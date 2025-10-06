import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  getCategoriesController,
  updateCategoryController,
} from "../controllers/categories.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types"; 

const catogryRouter = Router();
catogryRouter.use(withAuth(ROLES.USER));

catogryRouter.get("/categories", authorizeUserOrAdmin, getCategoriesController);
catogryRouter.get("/:id", authorizeUserOrAdmin, getCategoryByIdController);

export default catogryRouter;
