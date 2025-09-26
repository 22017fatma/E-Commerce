import { mysqlTable, int, timestamp } from "drizzle-orm/mysql-core";

import { relations } from "drizzle-orm/relations";
import { products } from "./products/products.table";
import { users } from "./users.table";

export const wishlists = mysqlTable("whishlists", {
  id: int("id").autoincrement().primaryKey(),
  product_id: int("product_id").references(() => products.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  user_id: int("user_id").references(() => users.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const wishlistsRelation = relations(wishlists, ({ one }) => ({
  products: one(products, {
    fields: [wishlists.product_id],
    references: [products.id],
  }),
}));

export const wishlistsRelationWithUsers = relations(wishlists, ({ one }) => ({
  users: one(users, {
    fields: [wishlists.user_id],
    references: [users.id],
  }),
}));
