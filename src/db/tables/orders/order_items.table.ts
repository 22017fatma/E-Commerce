import {
  mysqlTable,
  int,
  decimal,
  timestamp
} from "drizzle-orm/mysql-core";

import { schema } from "../../../models/schema";
import { relations } from "drizzle-orm/relations";

export const order_items = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  order_id: int("order_id").notNull(),
  product_id: int("product_id").notNull(),
  price_at_purchase: decimal("price_at_purchase", { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const order_itemsRelation = relations(order_items, ({ one }) => ({
  products: one(schema.products, {
    fields: [order_items.product_id],
    references: [schema.products.id],
  }),
}));

export const ordersManyRelation = relations(order_items, ({ one }) => ({
  orders: one(schema.orders, {
    fields: [order_items.order_id],
    references: [schema.orders.id],
  }),
}));
