
import {
  mysqlTable,
  int,
  varchar,
  timestamp,
  
} from "drizzle-orm/mysql-core";

import { schema } from "../../models/schema";
import { relations } from "drizzle-orm/relations";


export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 200 }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});


export const usersRelationWithwhishlists = relations(users, ({ one }) => ({
  wishlists: one(schema.wishlists),
}));

export const usersRelationWithCreditCards = relations(users, ({ many }) => ({
  credit_cards: many(schema.credit_cards),
}));

export const usersRelationWithCarts = relations(users, ({ many }) => ({
  carts: many(schema.carts),
}));


