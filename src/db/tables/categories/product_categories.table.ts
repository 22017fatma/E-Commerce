import { mysqlTable, int, text, timestamp } from "drizzle-orm/mysql-core";

import { schema } from "../../../models/schema";
import { relations } from "drizzle-orm/relations";


export const product_categories = mysqlTable("product_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name"),
  category_id: int("category_id").notNull().unique(),
  product_id: int("product_id").notNull().unique(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const product_categoriesRelationWithcategories = relations(product_categories, ({ one }) => ({
  categories: one(schema.categories, {
    fields: [product_categories.category_id],
    references: [schema.categories.id],
  }),
}));


export const product_categoriesRelation = relations(product_categories, ({ one }) => ({
  products: one(schema.products, {
    fields:[product_categories.product_id],
    references: [schema.products.id],
  }),
}));
