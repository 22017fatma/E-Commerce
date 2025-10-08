import { db } from "../db/client";
import { order_items } from "../models/schema";
import { eq, and } from "drizzle-orm";
import { ROLES } from "../types";

export async function getAllOrderItems(role: ROLES, orderId: number) {
  if (role === ROLES.ADMIN) {
    return await db.select().from(order_items);
  }
  if (role === ROLES.USER) {
    return await db.select().from(order_items).where(eq(order_items.order_id, orderId));
  }
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

export async function deleteOrderItem(id: number, orderId: number) {
  return await db.delete(order_items).where(and(eq(order_items.id, id), eq(order_items.order_id, orderId)));
}

export async function updateOrderItem(
  id: number,
  orderId: number,
  data: {
    product_id: number;
    order_id: number;
    price_at_purchase: string;
  }
) {
  return await db.update(order_items).set(data).where(and(eq(order_items.id, id), eq(order_items.order_id, orderId)));
}
