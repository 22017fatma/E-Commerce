import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";

import { relations } from "drizzle-orm/relations";
import { carts } from "./carts/carts.table";
import { credit_cards } from "./credit_cards.table";
import { wishlists } from "./wishlists.table";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 200 }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const usersRelationWithwhishlists = relations(users, ({ one }) => ({
  wishlists: one(wishlists),
}));

export const usersRelationWithCreditCards = relations(users, ({ many }) => ({
  credit_cards: many(credit_cards),
}));

export const usersRelationWithCarts = relations(users, ({ many }) => ({
  carts: many(carts),
}));
