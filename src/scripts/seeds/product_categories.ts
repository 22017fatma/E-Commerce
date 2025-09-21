import { db } from "../../db/client";
import { products, categories, product_categories } from "../../models/schema";
import { eq } from "drizzle-orm";

export async function seedProductCategories() {
  
  const productList = await db.query.products.findMany();

    const categoryList = await db.query.categories.findMany();

    const productCategoryData = productList.flatMap((product) =>
      categoryList.map((category) => ({
        product_id: product.id,
        category_id: category.id,
      }))
    );

    await db.insert(product_categories).values(productCategoryData);

    console.log("Product categories seeded successfully");

}
