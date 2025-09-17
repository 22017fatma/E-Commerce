import {
  mysqlTable,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";

import { schema } from "../../models/schema";
import { relations } from "drizzle-orm/relations";


export const wishlists = mysqlTable("whishlists", {
  id: int("id").autoincrement().primaryKey(),
  product_id: int("product_id").notNull(),
  user_id: int("product_id").notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});


export const wishlistsRelation = relations(wishlists, ({ one }) => ({
  products: one(schema.products, {
    fields:[wishlists.product_id],
    references: [schema.products.id],
  }),
}));

export const wishlistsRelationWithUsers = relations(wishlists, ({ one }) => ({
  users: one(schema.users, {
    fields: [wishlists.user_id],
    references: [schema.users.id],
  }),
}));
