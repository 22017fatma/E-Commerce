import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";

import { relations } from "drizzle-orm/relations";
import { carts } from "./carts/carts.table";
import { credit_cards } from "./credit_cards.table";
import { wishlists } from "./wishlists.table";
import { ROLES } from "../../types";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 200 }).notNull(),
  role: varchar("role", { length: 20 })
    .$type<ROLES>()
    .default(ROLES.USER)
    .notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const usersRelations = relations(
  users,
  ({ one, many }) => ({
    wishlist: one(wishlists),
    credit_cards: many(credit_cards),
  })
);
