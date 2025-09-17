import {
  mysqlTable,
  int,
  decimal,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

import { schema } from "../../../models/schema";
import { relations } from "drizzle-orm/relations";


export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("user_id").notNull(),
  credit_card_id: int("credit_card_id").notNull(),
  adress_id: int("adress_id").notNull(),
  total_price: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 150 }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const ordersRelationWithOrderItems = relations(orders, ({ many }) => ({
  order_items: many(schema.order_items),
}));


export const ordersManyRelation = relations(orders, ({ one }) => ({
  credit_cards: one(schema.credit_cards, {
    fields:[orders.credit_card_id],
    references: [schema.credit_cards.id],
  }),
}));