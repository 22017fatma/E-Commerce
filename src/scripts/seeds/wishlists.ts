import { db } from "../../db/client";
import { wishlists } from "../../models/schema";
import { faker } from "@faker-js/faker";

export async function seedWishlists() {
  const productsList = await db.query.products.findMany();
  const usersList = await db.query.users.findMany();
  //check
  if (!usersList.length || !productsList.length) {
    console.warn("cannot seed wishlists");
    return;
  }
  const wishlistItems: { user_id: number; product_id: number }[] = [];

  for (const user of usersList) {
    const itemCount = faker.number.int({ min: 1, max: productsList.length });

    const randomProducts = faker.helpers.arrayElements(productsList, itemCount);

    for (const product of randomProducts) {
      wishlistItems.push({
        user_id: user.id,
        product_id: product.id,
      });
    }
  }

  await db.insert(wishlists).values(wishlistItems);

  console.log(" Wishlists seeded successfully");
}
