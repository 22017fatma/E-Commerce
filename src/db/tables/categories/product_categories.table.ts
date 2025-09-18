import { mysqlTable, int, text, timestamp } from "drizzle-orm/mysql-core";

<<<<<<< HEAD
import { categories } from "./categories.table";
import { products } from "../products/products.table";
=======
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
import { relations } from "drizzle-orm/relations";
import { products } from "../products/products.table";
import { categories } from "./categories.table";

export const product_categories = mysqlTable("product_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name"),
  category_id: int("category_id").notNull().unique(),
  product_id: int("product_id").notNull().unique(),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

<<<<<<< HEAD
export const product_categoriesRelationWithcategories = relations(product_categories, ({ one }) => ({
  categories: one(categories, {
    fields: [product_categories.category_id],
    references: [categories.id],
  }),
}));


export const product_categoriesRelation = relations(product_categories, ({ one }) => ({
  products: one(products, {
    fields:[product_categories.product_id],
    references: [products.id],
  }),
}));
=======
export const product_categoriesRelationWithcategories = relations(
  product_categories,
  ({ one }) => ({
    categories: one(categories, {
      fields: [product_categories.category_id],
      references: [categories.id],
    }),
  })
);

export const product_categoriesRelation = relations(
  product_categories,
  ({ one }) => ({
    products: one(products, {
      fields: [product_categories.product_id],
      references: [products.id],
    }),
  })
);
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
