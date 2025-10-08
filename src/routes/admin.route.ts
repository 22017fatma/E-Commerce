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
  updateProductCategoryController,
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
adminRouter.get("/users", getAllUsersController);
adminRouter.get("/users/:id", getUserByIdController);
adminRouter.post("/user", createUserController);
adminRouter.delete("/users/:id", deleteUserController);
adminRouter.put("/user/:id", updateUserController);
//order
adminRouter.get("/orders", getOrdersController);
adminRouter.get("/orders/:id", getOrderByIdController);
adminRouter.post("/orders", createOrderController);
adminRouter.put("/orders/:id", updateOrderController);
adminRouter.delete("/orders/:id", deleteOrderController);
//catogry
adminRouter.get("/categories", getCategoriesController);
adminRouter.get("/categories/:id", getCategoryByIdController);
adminRouter.post("/categories", createCategoryController);
adminRouter.delete("/categories/:id", deleteCategoryController);
adminRouter.put("/categories/:id", updateCategoryController);
//wishlist
adminRouter.get("/wishlists", getWishlistsController);
adminRouter.get("/wishlists/:id", getWishlistByIdController);
adminRouter.post("/wishlists", createWishlistController);
adminRouter.delete("/wishlists/:id", deleteWishlistController);
adminRouter.put("/wishlists/:id", updateWishlistController);
//credit card
adminRouter.get("/credit_cards", getCreditCardsController);
adminRouter.get("/credit_cards/:id", getCreditCardByIdController);
adminRouter.post("/credit_cards", createCreditCardController);
adminRouter.delete("/credit_cards/:id", deleteCreditCardController);
adminRouter.put("/credit_cards/:id", updateCreditCardController);
//cart
adminRouter.get("/carts", getCartsController);
adminRouter.get("/carts/:id", getCartByIdController);
adminRouter.post("/carts", createCartController);
adminRouter.delete("/carts/:id", deleteCartController);
adminRouter.put("/carts/:id", updateCartController);
//cart item
adminRouter.get("/cart_items", getCartItemsController);
adminRouter.get("/cart_items/:id", getCartItemByIdController);
adminRouter.post("/cart_items", createCartItemController);
adminRouter.delete("/cart_items/:id", deleteCartItemController);
adminRouter.put("/cart_items/:id", updateCartItemController);
//order item
adminRouter.get("/order_items", getOrderItemsController);
adminRouter.get("/order_items/:id", getOrderItemByIdController);
adminRouter.post("/order_items", createOrderItemController);
adminRouter.delete("/order_items/:id", deleteOrderItemController);
adminRouter.put("/order_items/:id", updateOrderItemController);
//product category
adminRouter.get("/product_categories", getProductCategoriesController);
adminRouter.get("/product_categories/:id", getProductCategoryByIdController);
adminRouter.post("/product_categories", createProductCategoryController);
adminRouter.delete("/product_categories/:id", deleteProductCategoryController);
adminRouter.put( "/product_categories/:id",updateProductCategoryController);
//product image
adminRouter.get("/product_images", getProductImagesController);
adminRouter.get("/product_images/:id", getProductImageByIdController);
adminRouter.post("/product_images", createProductImageController);
adminRouter.delete("/product_images/:id", deleteProductImageController);
adminRouter.put("/product_images/:id", updateProductImageController);
//address
adminRouter.get("/addresses", getAddressesController);
adminRouter.get("/addresses/:id", getAddressByIdController);
adminRouter.post("/addresses", createAddressController);
adminRouter.delete("/addresses/:id", deleteAddressController);
adminRouter.put("/addresses/:id", updateAddressController);

export default adminRouter;
