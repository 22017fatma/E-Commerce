import { mysqlTable, int, timestamp } from "drizzle-orm/mysql-core";

<<<<<<< HEAD
import { products } from "./products.table"; 
=======
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
import { relations } from "drizzle-orm/relations";
import { products } from "./products.table";

export const product_images = mysqlTable("product_images", {
  id: int("id").autoincrement().primaryKey(),
  product_id: int("product_id").notNull(),
  url: int("url"),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const product_imagesRelation = relations(product_images, ({ one }) => ({
  products: one(products, {
<<<<<<< HEAD
    fields:[product_images.product_id],
=======
    fields: [product_images.product_id],
>>>>>>> ae22fd7bbb76e636c2eeba7628fbf129e0f2e12b
    references: [products.id],
  }),
}));
