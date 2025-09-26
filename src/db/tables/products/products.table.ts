import {
  mysqlTable,
  int,
  decimal,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

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
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
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
}));
