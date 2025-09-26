import { db } from "../../db/client";
import { cart_items } from "../../models/schema";

export async function seedCartItems() {
  const productList = await db.query.products.findMany();
  const cartsList = await db.query.carts.findMany();
    
  const itemsToInsert = [];
  for (const cart of cartsList) {
    for (const product of productList) {
      itemsToInsert.push({
        cart_id: cart.id,
        product_id: product.id,
        quantity: Math.floor(Math.random() * 5),
      });
    }
  }
  await db.insert(cart_items).values(itemsToInsert);

  console.log("Cart Items seeded successfully");
}
