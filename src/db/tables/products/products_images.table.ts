import { mysqlTable, int, timestamp, text } from "drizzle-orm/mysql-core";

import { relations } from "drizzle-orm/relations";
import { products } from "./products.table";

export const product_images = mysqlTable("product_images", {
  id: int("id").autoincrement().primaryKey(),
  product_id: int("product_id").references(() => products.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  url: text("url"),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const product_imagesRelation = relations(product_images, ({ one }) => ({
  products: one(products, {
    fields: [product_images.product_id],

    references: [products.id],
  }),
}));
