import { db } from "../../db/client";
import { products, product_images } from "../../models/schema";

export async function seedProducts() {
   
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    for (const item of data) {
      // product
      const inserted: { id: number }[] = await db
        .insert(products)
        .values({
          name: item.title,
          stock: Math.floor(Math.random() * 100), // 0 → 99
          price: item.price,
        })
        .$returningId();

      const productId = inserted[0]?.id;

      if (!productId) {
        throw new Error(" Failed to get product ID after insert");
      }

      // product image
      await db.insert(product_images).values({
        product_id: productId,
        url: item.image,
      });
    }

    console.log(" Products + images seeded successfully");
  
};
