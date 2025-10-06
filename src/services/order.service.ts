import { db } from "../db/client";
import { orders } from "../models/schema";
import { eq ,and} from "drizzle-orm";
import { ROLES } from "../types";

export async function getAllOrders(role: ROLES, user_id: number) {
  if (role === ROLES.ADMIN) {
    return await db.select().from(orders);
  }
  if (role === ROLES.USER) {
    return await db.select().from(orders).where(eq(orders.user_id, user_id));
  }
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

export async function deleteOrder(userId: number, id: number) {
  return await db.delete(orders).where(and(eq(orders.id,id),eq(orders.user_id,userId)));
}


export async function updateOrder(
  userId: number,
  id: number,
  data: { user_id?: number; product_id?: number; quantity?: number }
) {
  return await db.update(orders).set(data).where(and(eq(orders.id,id),eq(orders.user_id,userId)));
}