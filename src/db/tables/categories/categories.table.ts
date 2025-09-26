import { mysqlTable, int, text, timestamp } from "drizzle-orm/mysql-core";

import { relations } from "drizzle-orm/relations";
import { product_categories } from "./product_categories.table";

export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name"),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const categoriesRelationWithProductCategories = relations(
  categories,
  ({ many }) => ({
    product_categories: many(product_categories),
  })
);
