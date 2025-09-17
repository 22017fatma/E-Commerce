import {
  mysqlTable,
  int,
  timestamp
} from "drizzle-orm/mysql-core";

import { schema } from "../../../models/schema";
import { relations } from "drizzle-orm/relations";

export const carts = mysqlTable("carts", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("userr_id").notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const cartsRelationWithUser = relations(carts, ({ one }) => ({
    users: one(schema.users, {
      fields: [carts.user_id],
      references: [schema.users.id],
    }),
}));

export const cartsRelationWithCartsItems = relations(carts, ({ many }) => ({
  cart_items: many(schema.cart_items),
}));