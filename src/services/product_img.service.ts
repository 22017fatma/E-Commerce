import { db } from "../db/client";
import { product_images } from "../models/schema";
import { eq } from "drizzle-orm";

export async function getAllProductImages() {
  return await db.select().from(product_images);
};

export async function getProductImageById(id: number) {
  return await db.select().from(product_images).where(eq(product_images.id, id));
};

export async function createProductImage(data: {
  product_id: number;
  url: string;
}) {
  return await db.insert(product_images).values(data);
};

export async function deleteProductImage(id: number) {
  return await db.delete(product_images).where(eq(product_images.id, id));
};

export async function updateProductImage(
  id: number,
  data: {
    product_id: number;
    url: string;
  }
) {
  return await db.update(product_images).set(data).where(eq(product_images.id, id));
};  