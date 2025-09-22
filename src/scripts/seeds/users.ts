import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { db } from "../../db/client";
import { users, addresses } from "../../models/schema";

const SALT_ROUNDS = 10;

export async function seedUser(count = 10) {
  for (let i = 0; i < count; i++) {
    const plainPassword = faker.internet.password();
    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);

    const userResult = await db
      .insert(users)
      .values({
        email: faker.internet.email(),
        password: hashedPassword,
      })
      .$returningId();

    const userId = userResult[0]?.id;
    if (!userId) {
      throw new Error(" Failed to get User ID after insert");
    }

    await db.insert(addresses).values({
      user_id: userId,
      name: faker.person.fullName(),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      is_default: true,
    });
  }

  console.log("Users + Addresses seeded successfully ");
}
