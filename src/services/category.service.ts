import { db } from "../db/client";
import { categories } from "../models/schema";
import { eq, and } from "drizzle-orm";
import { ROLES } from "../types";
export async function getAllCategories(role: ROLES, user_id: number) {
  if (role === ROLES.ADMIN) {
    return await db.select().from(categories);
  }
  if (role === ROLES.USER) {
    return await db.select().from(categories).where(eq(categories.id, user_id));
  }
}

export async function getCategoryById(id: number) {
  return await db.select().from(categories).where(eq(categories.id, id));
}

export async function createCategory(data: { name: string; id: number }) {
  return await db.insert(categories).values(data);
}

export async function deleteCategory(id: number,userId:number) {
  return await db.delete(categories).where(and(eq(categories.id, id),eq(categories.id,userId)));
}

export async function updateCategory(
  id: number,userId:number,
  data: { name?: string; parent_id?: number }
) {
  return await db.update(categories).set(data).where(and(eq(categories.id, id),eq(categories.id,userId)));
}
