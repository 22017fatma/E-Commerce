import {
  mysqlTable,
  int,
  decimal,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

import { schema } from "../../../models/schema";
import { relations } from "drizzle-orm/relations";



export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  stock: int("stock").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const productManyRelation = relations(products, ({ many }) => ({
  product_categories: many(schema.product_categories),
}));

export const product_imagesManyRelation = relations(products, ({ many }) => ({
  product_images: many(schema.product_images),
}));

export const order_itemsManyRelation = relations(products, ({ many }) => ({
  order_items: many(schema.order_items),
}));

export const wishlistsManyRelation = relations(products, ({ many }) => ({
  wishlists: many(schema.wishlists),
}));

export const cart_itemsManyRelation = relations(products, ({ many }) => ({
  cart_items: many(schema.cart_items),
}));