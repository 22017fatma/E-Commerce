import { db } from "../db/client";
import { addresses } from "../models/schema";
import { eq } from "drizzle-orm";

export async function getAllAddresses() {
  return await db.select().from(addresses);
}

export async function getAddressById(id: number) {
  const result = await db.select().from(addresses).where(eq(addresses.id, id));
  if (!result.length) throw new Error("Adress not found");
  return result[0];
}

export async function createAddress(data: {
  user_id: number;
  name: string;
  street: string;
  city: string;
  is_default: boolean;
}) {
  return await db.insert(addresses).values(data);
}



export async function deleteAddress(id: number) {
  return await db.delete(addresses).where(eq(addresses.id, id));
}

export async function updateAddress(
  id: number,
  data: {
    user_id?: number;
    name?: string;
    street?: string;
    city?: string;
    is_default?: boolean;
  }
) {
  return await db.update(addresses).set(data).where(eq(addresses.id, id));
}
