import { db } from "../../db/client";
import { carts,cart_items } from "../../models/schema";

export async function seedCarts() {
    const response = await fetch("https://fakestoreapi.com/carts");
  const data = await response.json();
  await db.transaction(async (tx) => {
    for (const item of data) {
      const inserted: { id: number }[] = await tx
        .insert(carts)
        .values({
          user_id: item.userId,
          created_at: new Date(item.date),
          updated_at: new Date(item.date),
        })
        .$returningId();
      
      const cartId = inserted[0]?.id;
       if (!cartId) {
         throw new Error(" Failed to get Cart ID after insert");
       }
       //cart items
      for (const p of item.products) {
        await tx.insert(cart_items).values({
          cart_id: cartId,
          product_id: p.productId,
          quantity: p.quantity,
        });
      }
    }

    console.log("Carts + Cart items seeded successfully");

    });
};
