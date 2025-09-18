import {
  mysqlTable,
  int,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

<<<<<<< HEAD
import { users } from "./users.table"; 
=======
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
import { relations } from "drizzle-orm/relations";
import { users } from "./users.table";

export const addresses = mysqlTable("addresses", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("user_id").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  street: varchar("street", { length: 150 }).notNull(),
  city: varchar("expire_date", { length: 150 }).notNull(),
  is_default: boolean("is_active").default(false).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const addressessRelationWithUsers = relations(addresses, ({ one }) => ({
<<<<<<< HEAD
    users: one(users, {
=======
  users: one(users, {
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
    fields: [addresses.user_id],
    references: [users.id],
  }),
}));
