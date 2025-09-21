import { db } from "../../db/client";
import { product_categories } from "../../models/schema";

export async function seedProductCategories() {
  const productList = await db.query.products.findMany();
  console.log(productList);

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
