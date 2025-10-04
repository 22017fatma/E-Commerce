import { db } from "../db/client";
import { cart_items } from "../models/schema";
import { eq } from "drizzle-orm";

export async function getAllCartItems() {
  return await db.select().from(cart_items);
}

export async function getCartItemById(id: number) {
  const result = await db.select().from(cart_items).where(eq(cart_items.id, id));
  if (result.length === 0) throw new Error("Cart item not found");
  return result[0];

}

export async function createCartItem(data: {
  product_id: number;
  cart_id: number;
  quantity: number;
}) {
  if(data.quantity<=0) throw new Error("Quantity must be greater than 0");
  const result = await db.insert(cart_items).values(data);
  return result;
}

export async function deleteCartItem(id: number) {
  const result = await db.delete(cart_items).where(eq(cart_items.id, id));
  if(!result) throw new Error("Cart item not found");
  return result;
}

export async function updateCartItem(
  id: number,
  data: { cart_id?: number; product_id?: number; quantity?: number }
) {
  if (data.quantity !== undefined && data.quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }
  const result = await db.update(cart_items).set(data).where(eq(cart_items.id, id));
  if (!result) throw new Error("Cart item not found");
  return result;
}