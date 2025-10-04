import { db } from "../db/client";
import { order_items } from "../models/schema";
import { eq } from "drizzle-orm";

export async function getAllOrderItems() {
  return await db.select().from(order_items);
}

export async function getOrderItemById(id: number) {
  return await db.select().from(order_items).where(eq(order_items.id, id));
}

export async function createOrderItem(data: {
  product_id: number;
  order_id: number;
  price_at_purchase: string;
}) {
  return await db.insert(order_items).values(data);
}

export async function deleteOrderItem(id: number) {
  return await db.delete(order_items).where(eq(order_items.id, id));
}

export async function updateOrderItem(
  id: number,
  data: {
    product_id: number;
    order_id: number;
    price_at_purchase: string;
  }
) {
  return await db.update(order_items).set(data).where(eq(order_items.id, id));
}
