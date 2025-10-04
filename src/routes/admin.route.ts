import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  addProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  updateProductController,
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
import {
  createCartItemController,
  deleteCartItemController,
  getCartItemsController,
  getCartItemByIdController,
  updateCartItemController,
} from "../controllers/cart_item.controller";
import {
  createOrderItemController,
  deleteOrderItemController,
  getOrderItemByIdController,
  getOrderItemsController,
  updateOrderItemController,
} from "../controllers/order_item.controller";
import {
  createProductCategoryController,
  deleteProductCategoryController,
  getProductCategoryByIdController,
  getProductCategoriesController,
  updateProductCategoryController
} from "../controllers/product_category.controller";
import {
  createProductImageController,
  deleteProductImageController,
  getProductImageByIdController,
  getProductImagesController,
  updateProductImageController,
} from "../controllers/product_img.controller";
import {
  createAddressController,
  deleteAddressController,
  getAddressByIdController,
  getAddressesController,
  updateAddressController,
} from "../controllers/address.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const adminRouter = Router();

adminRouter.use(withAuth(ROLES.ADMIN));
//product
adminRouter.get("/products", getProductsController);
adminRouter.get("/products/:id", getProductByIdController);
adminRouter.post("/products", addProductController);
adminRouter.put("/products/:id", updateProductController);
adminRouter.delete("/products/:id", deleteProductController);
//user
adminRouter.get("/", authorizeUserOrAdmin, getAllUsersController);
adminRouter.get("/:id", authorizeUserOrAdmin, getUserByIdController);
adminRouter.post("/user", authorizeUserOrAdmin, createUserController);
adminRouter.delete("/users/:id", authorizeUserOrAdmin, deleteUserController);
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
//cart item
adminRouter.get("/cart_items", authorizeUserOrAdmin, getCartItemsController);
adminRouter.get("/cart_items/:id", authorizeUserOrAdmin, getCartItemByIdController);
adminRouter.post("/cart_items", authorizeUserOrAdmin, createCartItemController);
adminRouter.delete("/cart_items/:id", authorizeUserOrAdmin, deleteCartItemController);
adminRouter.put("/cart_items/:id", authorizeUserOrAdmin, updateCartItemController);
//order item
adminRouter.get("/order_items", authorizeUserOrAdmin, getOrderItemsController);
adminRouter.get("/order_items/:id", authorizeUserOrAdmin, getOrderItemByIdController);
adminRouter.post("/order_items", authorizeUserOrAdmin, createOrderItemController);
adminRouter.delete("/order_items/:id", authorizeUserOrAdmin, deleteOrderItemController);
adminRouter.put("/order_items/:id", authorizeUserOrAdmin, updateOrderItemController);
//product category
adminRouter.get("/product_categories", authorizeUserOrAdmin, getProductCategoriesController);
adminRouter.get("/product_categories/:id", authorizeUserOrAdmin, getProductCategoryByIdController);
adminRouter.post("/product_categories", authorizeUserOrAdmin, createProductCategoryController);
adminRouter.delete("/product_categories/:id", authorizeUserOrAdmin, deleteProductCategoryController);
adminRouter.put("/:id", authorizeUserOrAdmin, updateProductCategoryController); 
//product image
adminRouter.get("/product_images", authorizeUserOrAdmin, getProductImagesController);
adminRouter.get("/product_images/:id", authorizeUserOrAdmin, getProductImageByIdController);
adminRouter.post("/product_images", authorizeUserOrAdmin, createProductImageController);
adminRouter.delete("/product_images/:id", authorizeUserOrAdmin, deleteProductImageController);
adminRouter.put("/product_images/:id", authorizeUserOrAdmin, updateProductImageController); 
//address
adminRouter.get("/addresses", authorizeUserOrAdmin, getAddressesController);
adminRouter.get("/addresses/:id", authorizeUserOrAdmin, getAddressByIdController);
adminRouter.post("/addresses", authorizeUserOrAdmin, createAddressController);
adminRouter.delete("/addresses/:id", authorizeUserOrAdmin, deleteAddressController);
adminRouter.put("/addresses/:id", authorizeUserOrAdmin, updateAddressController);

export default adminRouter;
