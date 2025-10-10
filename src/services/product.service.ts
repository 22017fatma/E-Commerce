import { db } from "../db/client";
import { product_categories, products } from "../models/schema";
import { gt, and, gte, lte, like, SQL } from "drizzle-orm";
import { eq } from "drizzle-orm";

export async function getAllProducts(filters: ProductFilters = {}) {
  const clauses: SQL<any>[] = [];
  //stock
  const parsedStock = filters.stock
    ? Number(filters.stock)
      ? Number(filters.stock) <= 0
        ? 0
        : Number(filters.stock)
      : undefined
    : undefined;

  //name
  if (filters.name && filters.name.trim().length > 0) {
    clauses.push(like(products.name, `%${filters.name.trim()}%`));
  }

  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    const parsedMinPrice = Number(filters.minPrice || 0);
    const parsedMaxPrice = Number(filters.maxPrice || 100000);
    clauses.push(gte(products.price, parsedMinPrice.toString()));
    clauses.push(lte(products.price, parsedMaxPrice.toString()));
  } else if (filters.minPrice !== undefined) {
    clauses.push(gte(products.price, filters.minPrice.toString()));
  } else if (filters.maxPrice !== undefined) {
    clauses.push(lte(products.price, filters.maxPrice.toString()));
  }

  //stock
  if (parsedStock !== undefined) {
    clauses.push(gt(products.stock, parsedStock));
  }

  const where = !clauses.length
    ? undefined
    : clauses.length === 1
    ? clauses[0]
    : and(...clauses);

  return await db.query.products.findMany({
    where,
    with: {
      product_images: true,
      product_categories: true,
    },
  });
}
//  Get product by ID
export async function getProductById(id: number) {
  return await db.query.products.findFirst({
    where: eq(products.id, id),
  });
}

// Add product
export async function addProduct(name: string, price: string, stock: number) {
  return await db.insert(products).values({ name, price, stock });
}

//  Update product
export async function updateProduct(
  id: number,
  name?: string,
  price?: string,
  stock?: number
) {
  return await db
    .update(products)
    .set({ name, price, stock })
    .where(eq(products.id, id));
}
// Delete product
export async function deleteProduct(id: number) {
  return await db.delete(products).where(eq(products.id, id));
}
