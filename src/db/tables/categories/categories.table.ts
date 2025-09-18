import { mysqlTable, int, text, timestamp } from "drizzle-orm/mysql-core";
<<<<<<< HEAD
import { product_categories } from "./product_categories.table";
=======
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
import { relations } from "drizzle-orm/relations";
import { product_categories } from "./product_categories.table";

export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name"),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

<<<<<<< HEAD
export const categoriesRelationWithProductCategories = relations(categories, ({ many }) => ({
  product_categories: many(product_categories),
}));
=======
export const categoriesRelationWithProductCategories = relations(
  categories,
  ({ many }) => ({
    product_categories: many(product_categories),
  })
);
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
