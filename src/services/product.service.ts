import { db } from "../db/client";
import { products } from "../models/schema";
import { gt, and, gte, lte, like, SQL } from "drizzle-orm";

export async function getAllProducts(filters: ProductFilters = {}) {
  const clauses: SQL<any>[] = [];
  //stock
  const parsedStock = filters.stock
    ? Number(filters.stock)
      ? Number(filters.stock) <= 0
       ? 0
       :Number(filters.stock)
    
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
  });
}
