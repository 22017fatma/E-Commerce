import { db } from "../../db/client";
import { credit_cards } from "../../models/schema";
import { faker } from "@faker-js/faker";

export async function seedCreditCards() {
  const usersList = await db.query.users.findMany();

  const cardsToInsert = [];

  for (const user of usersList) {
    const numberOfCards = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < numberOfCards; i++) {
      cardsToInsert.push({
        user_id: user.id,
        type: faker.finance.creditCardIssuer(),
        card_number: faker.finance.creditCardNumber(),
        expire_date: faker.date.future().toISOString().slice(0, 7),
        is_default: i === 0,
      });
    }
  }

  await db.insert(credit_cards).values(cardsToInsert);

  console.log(" Credit cards seeded successfully");
}
