import { db } from "../db/client";
import { credit_cards } from "../models/schema";
import { eq, and } from "drizzle-orm";
import { ROLES } from "../types";


export async function getAllCreditCards(role: ROLES, userId: number) {
  if (role === ROLES.ADMIN) {
    return await db.select().from(credit_cards);
  }
  if (role === ROLES.USER) {
    return await db.select().from(credit_cards).where(eq(credit_cards.user_id, userId));
  }
}
  

export async function getCreditCardById(id: number) {
  return await db.select().from(credit_cards).where(eq(credit_cards.id, id));
  
};

export async function createCreditCard(data: {
  user_id: number;
  card_number: string;
  expire_date: string;
  type: string;
}) {
  return await db.insert(credit_cards).values({
    user_id: data.user_id,
    card_number: data.card_number,
    expire_date: data.expire_date,
    type: data.type
  });
};

export async function deleteCreditCard(id: number, userId: number) {
  
  return await db.delete(credit_cards).where(and(eq(credit_cards.id,id),eq(credit_cards.user_id,userId)));
};

export async function updateCreditCard(
  id: number,
  userId:number,
  data: {
    user_id: number;
    card_number: string;
    expire_date: string;
    type: string;
  }
) {
  return await db.update(credit_cards).set(data).where(and(eq(credit_cards.id,id),eq(credit_cards.user_id,userId)));

};  

