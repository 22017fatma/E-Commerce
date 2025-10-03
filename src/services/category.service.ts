import { db } from "../db/client";
import { categories } from "../models/schema";
import { eq } from "drizzle-orm";

export async function getAllCategories() {
  return await db.select().from(categories);
}

export async function getCategoryById(id: number) {
  return await db.select().from(categories).where(eq(categories.id, id));
}

export async function createCategory(data: { name: string; id: number }) {
  return await db.insert(categories).values(data);
}

export async function deleteCategory(id: number) {
  return await db.delete(categories).where(eq(categories.id, id));
}

export async function updateCategory(
  id: number,
  data: { name?: string; parent_id?: number }
) {
  return await db.update(categories).set(data).where(eq(categories.id, id));
}
