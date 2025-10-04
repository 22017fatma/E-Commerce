import { db } from "../db/client";
import { users } from "../models/schema";
import { eq } from "drizzle-orm";

export async function getAllUsers() {
  return await db.select().from(users);
}

export async function getUserById(id: number) {
  return await db.select().from(users).where(eq(users.id, id));
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return await db.insert(users).values(data);
}

export async function deleteUser(id: number) {
  return await db.delete(users).where(eq(users.id, id));
}
export async function updateUser(
  id: number,
  data: { name?: string; email?: string; password?: string }
) {
  return await db.update(users).set(data).where(eq(users.id, id));
}

export async function returnUserValid(userId:number) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, +userId))
    .limit(1);
  return result[0];
}
