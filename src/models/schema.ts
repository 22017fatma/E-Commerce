
import {
  addresses,
  addressessRelationWithUsers,
} from "../db/tables/addresses.table";
import {
  cart_items,
  cart_itemsRelation,
  cartsItemsRelationWithCarts,
} from "../db/tables/carts/cart_items.table";
import {
  carts,
  cartsRelationWithCartsItems,
  cartsRelationWithUser,
} from "../db/tables/carts/carts.table";
import {
  categories,
  categoriesRelationWithProductCategories,
} from "../db/tables/categories/categories.table";
import {
  credit_cards,
  cart_cardRelation,
  credit_cardManyRelation,
} from "../db/tables/credit_cards.table";
import {
  order_items,
  order_itemsRelation,
  ordersManyRelation,
} from "../db/tables/orders/order_items.table";
import {
  product_categories,
  product_categoriesRelation,
  product_categoriesRelationWithcategories,
} from "../db/tables/categories/product_categories.table";
import {
  orders,
  ordersRelationWithCreditCard,
  ordersRelationWithOrderItems,
} from "../db/tables/orders/orders.table";
import {
  product_images,
  product_imagesRelation,
} from "../db/tables/products/products_images.table";
import {
  products,
  cart_itemsManyRelation,
  order_itemsManyRelation,
  productManyRelation,
  product_imagesManyRelation,
  wishlistsManyRelation,
} from "../db/tables/products/products.table";
import {
  users,
  usersRelationWithCarts,
  usersRelationWithCreditCards,
  usersRelationWithwhishlists,
} from "../db/tables/users.table";
import {
  wishlists,
  wishlistsRelation,
  wishlistsRelationWithUsers,
} from "../db/tables/wishlists.table";

export const schema = {
  addresses,
  cart_items,
  carts,
  categories,
  credit_cards,
  order_items,
  product_categories,
  orders,
  product_images,
  products,
  users,
  wishlists,
  // relations
  addressessRelationWithUsers,
  cart_itemsRelation,
  cartsItemsRelationWithCarts,
  cartsRelationWithCartsItems,
  cartsRelationWithUser,
  categoriesRelationWithProductCategories,
  cart_cardRelation,
  credit_cardManyRelation,
  order_itemsRelation,
  ordersManyRelation,
  product_categoriesRelation,
  product_categoriesRelationWithcategories,
  ordersRelationWithOrderItems,
  product_imagesRelation,
  cart_itemsManyRelation,
  order_itemsManyRelation,
  productManyRelation,
  product_imagesManyRelation,
  wishlistsManyRelation,
  usersRelationWithCarts,
  usersRelationWithCreditCards,
  usersRelationWithwhishlists,
  wishlistsRelation,
  wishlistsRelationWithUsers,
};

export {
  addresses,
  cart_items,
  carts,
  categories,
  credit_cards,
  order_items,
  product_categories,
  orders,
  product_images,
  products,
  users,
  wishlists,

  // relations
  addressessRelationWithUsers,
  cart_itemsRelation,
  cartsItemsRelationWithCarts,
  cartsRelationWithCartsItems,
  cartsRelationWithUser,
  categoriesRelationWithProductCategories,
  cart_cardRelation,
  credit_cardManyRelation,
  order_itemsRelation,
  ordersManyRelation,
  product_categoriesRelation,
  product_categoriesRelationWithcategories,
  ordersRelationWithCreditCard,
  ordersRelationWithOrderItems,
  product_imagesRelation,
  cart_itemsManyRelation,
  order_itemsManyRelation,
  productManyRelation,
  product_imagesManyRelation,
  wishlistsManyRelation,
  usersRelationWithCarts,
  usersRelationWithCreditCards,
  usersRelationWithwhishlists,
  wishlistsRelation,
  wishlistsRelationWithUsers,
};
