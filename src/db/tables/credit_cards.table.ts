import {
  mysqlTable,
  int,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

import { orders } from "./orders/orders.table"; 
import { users } from "./users.table";
import { relations } from "drizzle-orm/relations";

export const credit_cards = mysqlTable("credit_cards", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("user_id").notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  card_number: varchar("card_number", { length: 150 }).notNull(),
  expire_date: varchar("expire_date", { length: 150 }).notNull(),
  is_default: boolean("is_active").default(false).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});


export const credit_cardManyRelation = relations(credit_cards, ({ many }) => ({
  orders: many(orders),
}));

export const cart_cardRelation = relations(credit_cards, ({ one }) => ({
  users: one(users, {
    fields:[credit_cards.user_id],
    references: [users.id],
  }),
}));