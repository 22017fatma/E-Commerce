import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createWishlistController,
  deleteWishlistController,
  getWishlistByIdController,
  getWishlistsController,
  updateWishlistController
} from "../controllers/wishlist.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const wishlistRouter = Router();
wishlistRouter.use(withAuth(ROLES.USER));

wishlistRouter.get("/", authorizeUserOrAdmin, getWishlistsController);
wishlistRouter.post("/", authorizeUserOrAdmin, createWishlistController);
wishlistRouter.delete("/:id", authorizeUserOrAdmin, deleteWishlistController);
wishlistRouter.put("/:id", authorizeUserOrAdmin, updateWishlistController);

export default wishlistRouter;