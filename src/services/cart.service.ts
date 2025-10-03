import { db } from "../db/client";
import { carts } from "../models/schema";
import { eq } from "drizzle-orm";

export async function getAllCarts() {
  return await db.select().from(carts);
}

export async function getCartById(id: number) {
  return await db.select().from(carts).where(eq(carts.id, id));
}

export async function createCart(data: { user_id: number }) {
  return await db.insert(carts).values(data);
}

export async function deleteCart(id: number) {
  return await db.delete(carts).where(eq(carts.id, id));
}

export async function updateCart(id: number, data: { user_id?: number }) {
  return await db.update(carts).set(data).where(eq(carts.id, id));
}
