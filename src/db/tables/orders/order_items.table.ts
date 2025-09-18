import { mysqlTable, int, decimal, timestamp } from "drizzle-orm/mysql-core";

<<<<<<< HEAD
import { products } from "../products/products.table";
import { orders } from "./orders.table";
=======
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
import { relations } from "drizzle-orm/relations";
import { products } from "../products/products.table";
import { orders } from "./orders.table";

export const order_items = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  order_id: int("order_id").notNull(),
  product_id: int("product_id").notNull(),
  price_at_purchase: decimal("price_at_purchase", {
    precision: 10,
    scale: 2,
  }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const order_itemsRelation = relations(order_items, ({ one }) => ({
  products: one(products, {
    fields: [order_items.product_id],
    references: [products.id],
  }),
}));

export const ordersManyRelation = relations(order_items, ({ one }) => ({
  orders: one(orders, {
    fields: [order_items.order_id],
    references: [orders.id],
  }),
}));
