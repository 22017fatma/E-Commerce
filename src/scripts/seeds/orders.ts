import { db } from "../../db/client";
import { orders } from "../../models/schema";
import { faker } from "@faker-js/faker";

export async function seedOrders() {
  const usersList = await db.query.users.findMany();
  const cardsList = await db.query.credit_cards.findMany();
  const addressesList = await db.query.addresses.findMany();

  //Check
  if (!usersList.length || !cardsList.length || !addressesList.length) {
    console.warn("cannot seed orders");
    return;
  }
  const ordersToInsert = [];

  for (let i = 0; i < 20; i++) {
    const randomUser = faker.helpers.arrayElement(usersList);
    const randomCard = faker.helpers.arrayElement(cardsList);
    const randomAddress = faker.helpers.arrayElement(addressesList);

    ordersToInsert.push({
      user_id: randomUser.id,
      credit_card_id: randomCard.id,
      address_id: randomAddress.id,
      total_price: faker.commerce.price({ min: 50, max: 1000, dec: 2 }),
      status: faker.helpers.arrayElement([
        "pending",
        "paid",
        "shipped",
        "delivered",
        "canceled",
      ]),
    });
  }

  await db.insert(orders).values(ordersToInsert);

  console.log(" Orders seeded successfully");
}
