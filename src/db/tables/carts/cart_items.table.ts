import { mysqlTable, int, timestamp } from "drizzle-orm/mysql-core";


import { relations } from "drizzle-orm/relations";
import { products } from "../products/products.table";
import { carts } from "./carts.table";

export const cart_items = mysqlTable("cart_items", {
  id: int("id").autoincrement().primaryKey(),
  cart_id: int("cart_id").notNull(),
  product_id: int("product_id").notNull(),
  quantity: int("quantity").notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const cart_itemsRelation = relations(cart_items, ({ one }) => ({
  products: one(products, {
    fields: [cart_items.product_id],
    references: [products.id],
  }),
}));

export const cartsItemsRelationWithCarts = relations(cart_items, ({ one }) => ({

  carts: one(carts, {
    fields: [cart_items.cart_id],
    references: [carts.id],
  }),
  }));
