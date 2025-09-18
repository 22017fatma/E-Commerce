import {
  mysqlTable,
  int,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

<<<<<<< HEAD
import { orders } from "./orders/orders.table"; 
import { users } from "./users.table";
=======
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
import { relations } from "drizzle-orm/relations";
import { orders } from "./orders/orders.table";
import { users } from "./users.table";

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
<<<<<<< HEAD
    fields:[credit_cards.user_id],
=======
    fields: [credit_cards.user_id],
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
    references: [users.id],
  }),
}));
