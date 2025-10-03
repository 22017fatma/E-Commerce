import { db } from "../db/client";
import { orders } from "../models/schema";
import { eq } from "drizzle-orm";

export async function getAllOrders() {
  return await db.select().from(orders);
}

export async function getOrderById(id: number) {
  return await db.select().from(orders).where(eq(orders.id, id));
}

export async function createOrder(data: {
  user_id: number;
  product_id: number;
  quantity: number;
  total_price: string;
  status: string;
}) {
  return await db.insert(orders).values(data);
}

export async function deleteOrder(id: number) {
  return await db.delete(orders).where(eq(orders.id, id));
}


export async function updateOrder(
  id: number,
  data: { user_id?: number; product_id?: number; quantity?: number }
) {
  return await db.update(orders).set(data).where(eq(orders.id, id));
}