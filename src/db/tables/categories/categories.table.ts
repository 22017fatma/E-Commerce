import { mysqlTable, int, text, timestamp } from "drizzle-orm/mysql-core";
import { schema } from "../../../models/schema";
import { relations } from "drizzle-orm/relations";

export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name"),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const categoriesRelationWithProductCategories = relations(categories, ({ many }) => ({
  product_categories: many(schema.product_categories),
}));
