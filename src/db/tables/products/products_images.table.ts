import {
  mysqlTable,
  int,
  timestamp
} from "drizzle-orm/mysql-core";

import { schema } from "../../../models/schema";
import { relations } from "drizzle-orm/relations";

export const product_images = mysqlTable("product_images", {
  id: int("id").autoincrement().primaryKey(),
  product_id: int("product_id").notNull(),
  url: int("url"),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const product_imagesRelation = relations(product_images, ({ one }) => ({
  products: one(schema.products, {
    fields:[product_images.product_id],
    references: [schema.products.id],
  }),
}));

