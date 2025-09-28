import {
  mysqlTable,
  int,
  decimal,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

import { relations } from "drizzle-orm/relations";
import { credit_cards } from "../credit_cards.table";
import { order_items } from "./order_items.table";
import { users } from "../users.table";
import { addresses } from "../addresses.table";

export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("user_id").references(() => users.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  credit_card_id: int("credit_card_id").references(() => credit_cards.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  address_id: int("adress_id").references(() => addresses.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  total_price: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 150 }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const ordersRelationWithOrderItems = relations(orders, ({ many }) => ({
  order_items: many(order_items),
}));

export const ordersRelationWithCreditCard = relations(orders, ({ one }) => ({
  credit_cards: one(credit_cards, {
    fields: [orders.credit_card_id],

    references: [credit_cards.id],
  }),
}));
