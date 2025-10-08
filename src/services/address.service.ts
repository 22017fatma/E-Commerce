import { db } from "../db/client";
import { addresses } from "../models/schema";
import { eq, and } from "drizzle-orm";
import { ROLES } from "../types";

export async function getAllAddresses(role:ROLES,user_id:number) {
   if (role === ROLES.ADMIN) {
     return await db.select().from(addresses);
   }
   if (role === ROLES.USER) {
     return await db.select().from(addresses).where(eq(addresses.user_id, user_id));
   }
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



export async function deleteAddress(id: number, userId: number)
{
  return await db.delete(addresses).where(and(eq(addresses.id,id),eq(addresses.id,userId)));
}

export async function updateAddress(
  id: number,
  userId:number,
  data: {
    user_id?: number;
    name?: string;
    street?: string;
    city?: string;
    is_default?: boolean;
  }
) {

  return await db.update(addresses).set(data).where(and(eq(addresses.id,id),eq(addresses.id,userId)));
}
