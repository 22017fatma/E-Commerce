import { db } from "../db/client";
import { products } from "../models/schema";
import { eq, and, gte, lte, like } from "drizzle-orm";

export async function getAllProducts(filters: ProductFilters = {}) {
  const clauses: any[] = [];
  //name
  if (filters.name && filters.name.trim().length > 0) {
    clauses.push(like(products.name, `%${filters.name.trim()}%`));
  }
  //price
  if (filters.price !== undefined) {
    clauses.push(eq(products.price, filters.price.toString()));
  }

  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    clauses.push(
      and(
        gte(products.price, filters.minPrice.toString()),
        lte(products.price, filters.maxPrice.toString())
      )
    );
  } else if (filters.minPrice !== undefined) {
    clauses.push(gte(products.price, filters.minPrice.toString()));
  } else if (filters.maxPrice !== undefined) {
    clauses.push(lte(products.price, filters.maxPrice.toString()));
  }
  //stock
  if (filters.stock !== undefined) {
    clauses.push(eq(products.stock, filters.stock));
  }

    const where = clauses.length === 0? undefined: clauses.length === 1? clauses[0]: and(...clauses);

    return await db.query.products.findMany({
      where,
    });
}
