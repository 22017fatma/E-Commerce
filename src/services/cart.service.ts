import { db } from "../db/client";
import { carts } from "../models/schema";
import { eq, and } from "drizzle-orm";
import { ROLES } from "../types";

export async function getAllCarts(role: ROLES, user_id: number) {
  if (role === ROLES.ADMIN) {
    return await db.select().from(carts);
  }
  if (role === ROLES.USER) {
    return await db.select().from(carts).where(eq(carts.user_id, user_id));
  }
}

export async function getCartById(id: number) {
  return await db.select().from(carts).where(eq(carts.id, id));
}

export async function createCart(data: { user_id: number }) {
  return await db.insert(carts).values(data);
}

export async function deleteCart(id: number, userId: number) {
  return await db.delete(carts).where(and(eq(carts.id, id), eq(carts.user_id, userId)));
}

export async function updateCart(id: number,userId:number, data: { user_id?: number }) {
  return await db.update(carts).set(data).where(and(eq(carts.id, id), eq(carts.user_id, userId)));
}
