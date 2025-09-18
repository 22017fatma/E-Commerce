import { mysqlTable, int, timestamp } from "drizzle-orm/mysql-core";

<<<<<<< HEAD
import { products } from "../products/products.table";
import { carts } from "./carts.table";
=======
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
import { relations } from "drizzle-orm/relations";
import { products } from "../products/products.table";
import { carts } from "./carts.table";

export const cart_items = mysqlTable("cart_items", {
  id: int("id").autoincrement().primaryKey(),
  cart_id: int("cart_id").notNull(),
  product_id: int("product_id").notNull(),
  quantity: int("quantity").notNull(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const cart_itemsRelation = relations(cart_items, ({ one }) => ({
  products: one(products, {
<<<<<<< HEAD
    fields:[cart_items.product_id],
=======
    fields: [cart_items.product_id],
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
    references: [products.id],
  }),
}));

export const cartsItemsRelationWithCarts = relations(cart_items, ({ one }) => ({
<<<<<<< HEAD
     carts: one(carts, {
      fields: [cart_items.cart_id],
      references: [carts.id],
    }),
}));
=======
  carts: one(carts, {
    fields: [cart_items.cart_id],
    references: [carts.id],
  }),
}));
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
