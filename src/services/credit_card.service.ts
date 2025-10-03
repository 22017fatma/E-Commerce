import { db } from "../db/client";
import { credit_cards } from "../models/schema";
import { eq } from "drizzle-orm";


export async function getAllCreditCards() {
  return await db.select().from(credit_cards);
};

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

export async function deleteCreditCard(id: number) {
  return await db.delete(credit_cards).where(eq(credit_cards.id, id));
};

export async function updateCreditCard(
  id: number,
  data: {
    user_id: number;
    card_number: string;
    expire_date: string;
    type: string;
  }
) {
  return await db.update(credit_cards).set(data).where(eq(credit_cards.id, id));
};  

