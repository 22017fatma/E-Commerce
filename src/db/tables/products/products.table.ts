import {
  mysqlTable,
  int,
  decimal,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

<<<<<<< HEAD
import { product_categories } from "../categories/product_categories.table"; 
import { product_images } from "./products_images.table";
import { order_items } from "../orders/order_items.table";
import { wishlists } from "../wishlists.table";
import { cart_items } from "../carts/cart_items.table";
=======
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
import { relations } from "drizzle-orm/relations";
import { cart_items } from "../carts/cart_items.table";
import { product_categories } from "../categories/product_categories.table";
import { order_items } from "../orders/order_items.table";
import { wishlists } from "../wishlists.table";
import { product_images } from "./products_images.table";

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  stock: int("stock").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const productManyRelation = relations(products, ({ many }) => ({
  product_categories: many(product_categories),
}));

export const product_imagesManyRelation = relations(products, ({ many }) => ({
  product_images: many(product_images),
}));

export const order_itemsManyRelation = relations(products, ({ many }) => ({
  order_items: many(order_items),
}));

export const wishlistsManyRelation = relations(products, ({ many }) => ({
  wishlists: many(wishlists),
}));

export const cart_itemsManyRelation = relations(products, ({ many }) => ({
  cart_items: many(cart_items),
<<<<<<< HEAD
}));
=======
}));
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
