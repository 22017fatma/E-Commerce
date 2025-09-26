import {
  mysqlTable,
  int,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

import { relations } from "drizzle-orm/relations";
import { users } from "./users.table";

export const addresses = mysqlTable("addresses", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("user_id").references(() => users.id, {
    onDelete: "cascade",
    onUpdate: "set null",
  }),
  name: varchar("name", { length: 100 }).notNull(),
  street: varchar("street", { length: 150 }).notNull(),
  city: varchar("expire_date", { length: 150 }).notNull(),
  is_default: boolean("is_active").default(false).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const addressessRelationWithUsers = relations(addresses, ({ one }) => ({
  users: one(users, {
    fields: [addresses.user_id],
    references: [users.id],
  }),
}));
