import { db } from "../db/client";
import { product_categories } from "../models/schema";
import { eq, and } from "drizzle-orm";
import { ROLES } from "../types";

export async function getAllProductCategories(role: ROLES, categoryId: number) {
  if (role === ROLES.ADMIN) {
    return await db.select().from(product_categories);
  }
  if (role === ROLES.USER) {
    return await db.select().from(product_categories).where(eq(product_categories.category_id, categoryId));
  }
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

export async function deleteProductCategory(id: number, categoryId: number) {
  return await db.delete(product_categories).where(and(eq(product_categories.id, id), eq(product_categories.category_id, categoryId)));
};

export async function updateProductCategory(
  id: number,categoryId:number,
  data: {
    name: string;
    category_id: number;
    product_id: number;
  }
) {

  return await db.update(product_categories).set(data).where(and(eq(product_categories.id, id), eq(product_categories.category_id, categoryId)));
};  