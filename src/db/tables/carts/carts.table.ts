import { mysqlTable, int, timestamp } from "drizzle-orm/mysql-core";

<<<<<<< HEAD
import { users } from "../users.table";
import { cart_items } from "./cart_items.table";
=======
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
import { relations } from "drizzle-orm/relations";
import { users } from "../users.table";
import { cart_items } from "./cart_items.table";

export const carts = mysqlTable("carts", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("userr_id").notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const cartsRelationWithUser = relations(carts, ({ one }) => ({
<<<<<<< HEAD
    users: one(users, {
      fields: [carts.user_id],
      references: [users.id],
    }),
=======
  users: one(users, {
    fields: [carts.user_id],
    references: [users.id],
  }),
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
}));

export const cartsRelationWithCartsItems = relations(carts, ({ many }) => ({
  cart_items: many(cart_items),
<<<<<<< HEAD
}));
=======
}));
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
