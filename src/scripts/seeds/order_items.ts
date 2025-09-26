import { db } from "../../db/client";
import { order_items } from "../../models/schema";
import { faker } from "@faker-js/faker";

export async function seedOrderItems() {
  const ordersList = await db.query.orders.findMany();
  const productsList = await db.query.products.findMany();
  //check
  if (!ordersList.length || !productsList.length) {
    console.warn("cannot seed order items");
    return;
  }
  const orderItemsToInsert = [];

  for (const order of ordersList) {
    const itemCount = faker.number.int({ min: 1, max: productsList.length });

    for (let i = 0; i < itemCount; i++) {
      const randomProduct = faker.helpers.arrayElement(productsList);

      orderItemsToInsert.push({
        order_id: order.id,
        product_id: randomProduct.id,
        price_at_purchase: randomProduct.price,
      });
    }
  }

  await db.insert(order_items).values(orderItemsToInsert);

  console.log("Order items seeded successfully");
}
