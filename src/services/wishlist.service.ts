import { db } from "../db/client";
import { wishlists } from "../models/schema";
import { eq, and } from "drizzle-orm";
import { ROLES } from "../types";

export async function getAllWishlists(role: ROLES, user_id: number) {
    if (role === ROLES.ADMIN) {
      return await db.select().from(wishlists);
    }
    if (role === ROLES.USER) {
      return await db.select().from(wishlists).where(eq(wishlists.user_id, user_id));
    }
}

export async function getWishlistById(id: number) {
  return await db.select().from(wishlists).where(eq(wishlists.id, id));
}

export async function createWishlist(data: { product_id: number; user_id: number }) {
  return await db.insert(wishlists).values(data);
}

export async function deleteWishlist(id: number,userId:number) {
  return await db.delete(wishlists).where(and(eq(wishlists.id,id),eq(wishlists.user_id,userId)));
}
export async function updateWishlist(
  id: number,
  userId:number,
  data: { user_id?: number; product_id?: number }
) {
  return await db.update(wishlists).set(data).where(and(eq(wishlists.id,id),eq(wishlists.user_id,userId)));
}