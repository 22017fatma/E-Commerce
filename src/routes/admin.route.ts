import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  addProductController,
  deleteProductController,
} from "../controllers/adminProduct.controller";
import {
  createUserController,
  getAllUsersController,
  deleteUserController,
  getUserByIdController,
  updateUserController,
} from "../controllers/user.controller";
import {
  createOrderController,
  deleteOrderController,
  getOrderByIdController,
  getOrdersController,
  updateOrderController,
} from "../controllers/orders.controller";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  getCategoriesController,
  updateCategoryController,
} from "../controllers/categories.controller";
import {
  createWishlistController,
  deleteWishlistController,
  getWishlistByIdController,
  getWishlistsController,
  updateWishlistController,
} from "../controllers/wishlist.controller";
import {
  createCreditCardController,
  deleteCreditCardController,
  getCreditCardByIdController,
  getCreditCardsController,
  updateCreditCardController,
} from "../controllers/credit_card.controller";
import {
  createCartController,
  deleteCartController,
  getCartsController,
  getCartByIdController,
  updateCartController,
} from "../controllers/carts.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const adminRouter = Router();

adminRouter.use(withAuth(ROLES.ADMIN));
//product
adminRouter.post("/", addProductController);
adminRouter.delete("/:id", deleteProductController);
//user
adminRouter.get("/", authorizeUserOrAdmin, getAllUsersController);
adminRouter.get("/:id", authorizeUserOrAdmin, getUserByIdController);
adminRouter.post("/user", authorizeUserOrAdmin, createUserController);
adminRouter.delete("/user/:id", authorizeUserOrAdmin, deleteUserController);
adminRouter.put("/user/:id", authorizeUserOrAdmin, updateUserController);
//order
adminRouter.get("/orders", authorizeUserOrAdmin, getOrdersController);
adminRouter.get("/orders/:id", authorizeUserOrAdmin, getOrderByIdController);
adminRouter.post("/orders", authorizeUserOrAdmin, createOrderController);
adminRouter.put("/orders/:id", authorizeUserOrAdmin, updateOrderController);
adminRouter.delete("/orders/:id", authorizeUserOrAdmin, deleteOrderController);
//catogry
adminRouter.get("/categories", authorizeUserOrAdmin, getCategoriesController);
adminRouter.get("/categories/:id", authorizeUserOrAdmin, getCategoryByIdController);
adminRouter.post("/categories", authorizeUserOrAdmin, createCategoryController);
adminRouter.delete("/categories/:id", authorizeUserOrAdmin, deleteCategoryController);
adminRouter.put("/categories/:id", authorizeUserOrAdmin, updateCategoryController);
//wishlist
adminRouter.get("/wishlists", authorizeUserOrAdmin, getWishlistsController);
adminRouter.get("/wishlists/:id", authorizeUserOrAdmin, getWishlistByIdController);
adminRouter.post("/wishlists", authorizeUserOrAdmin, createWishlistController);
adminRouter.delete("/wishlists/:id", authorizeUserOrAdmin, deleteWishlistController);
adminRouter.put("/wishlists/:id", authorizeUserOrAdmin, updateWishlistController);
//credit card
adminRouter.get("/credit_cards", authorizeUserOrAdmin, getCreditCardsController);
adminRouter.get("/credit_cards/:id", authorizeUserOrAdmin, getCreditCardByIdController);
adminRouter.post("/credit_cards", authorizeUserOrAdmin, createCreditCardController);
adminRouter.delete("/credit_cards/:id", authorizeUserOrAdmin, deleteCreditCardController);
adminRouter.put("/credit_cards/:id", authorizeUserOrAdmin, updateCreditCardController);
//cart
adminRouter.get("/carts", authorizeUserOrAdmin, getCartsController);
adminRouter.get("/carts/:id", authorizeUserOrAdmin, getCartByIdController);
adminRouter.post("/carts", authorizeUserOrAdmin, createCartController);
adminRouter.delete("/carts/:id", authorizeUserOrAdmin, deleteCartController);
adminRouter.put("/carts/:id", authorizeUserOrAdmin, updateCartController);
export default adminRouter;
