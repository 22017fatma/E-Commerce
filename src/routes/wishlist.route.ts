import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createWishlistController,
  deleteWishlistController,
  getWishlistByIdController,
  getWishlistsController,
  updateWishlistController,
} from "../controllers/wishlist.controller";
import { ROLES } from "../types";

const wishlistRouter = Router();
wishlistRouter.use(withAuth(ROLES.USER));

wishlistRouter.get("/", getWishlistsController);
wishlistRouter.post("/", createWishlistController);
wishlistRouter.delete("/:id", deleteWishlistController);
wishlistRouter.put("/:id", updateWishlistController);

export default wishlistRouter;
