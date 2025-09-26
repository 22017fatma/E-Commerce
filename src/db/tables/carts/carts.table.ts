import { mysqlTable, int, timestamp } from "drizzle-orm/mysql-core";

import { relations } from "drizzle-orm/relations";
import { users } from "../users.table";
import { cart_items } from "./cart_items.table";

export const carts = mysqlTable("carts", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("userr_id").references(() =>users.id, {
    onDelete: "set null",
    onUpdate:"cascade",
  }),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const cartsRelationWithUser = relations(carts, ({ one }) => ({
  users: one(users, {
    fields: [carts.user_id],
    references: [users.id],
  }),
}));

export const cartsRelationWithCartsItems = relations(carts, ({ many }) => ({
  cart_items: many(cart_items),
}));
