import { db } from "../db/client";
import { product_categories } from "../models/schema";
import { eq } from "drizzle-orm";

export async function getAllProductCategories() {
  return await db.select().from(product_categories);
};

export async function getProductCategoryById(id: number) {
  return await db.select().from(product_categories).where(eq(product_categories.id, id));
};

export async function createProductCategory(data: {
  name: string;
  category_id: number;
  product_id: number;
}) {
  return await db.insert(product_categories).values(data);
};

export async function deleteProductCategory(id: number) {
  return await db.delete(product_categories).where(eq(product_categories.id, id));
};

export async function updateProductCategory(
  id: number,
  data: {
    name: string;
    category_id: number;
    product_id: number;
  }
) {
  return await db.update(product_categories).set(data).where(eq(product_categories.id, id));
};  