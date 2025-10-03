import { db } from "../db/client";
import { wishlists } from "../models/schema";
import { eq } from "drizzle-orm";

export async function getAllWishlists() {
  return await db.select().from(wishlists);
}

export async function getWishlistById(id: number) {
  return await db.select().from(wishlists).where(eq(wishlists.id, id));
}

export async function createWishlist(data: { product_id: number; user_id: number }) {
  return await db.insert(wishlists).values(data);
}

export async function deleteWishlist(id: number) {
  return await db.delete(wishlists).where(eq(wishlists.id, id));
}
export async function updateWishlist(
  id: number,
  data: { user_id?: number; product_id?: number }
) {
  return await db.update(wishlists).set(data).where(eq(wishlists.id, id));
}