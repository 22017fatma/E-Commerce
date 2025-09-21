import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { db } from "../../db/client";
import { users } from "../../models/schema";

const SALT_ROUNDS = 10;

export async function seedUser(count = 10) {
  const usersArray = await Promise.all(
    Array.from({ length: count }).map(async () => {
      const plainPassword = faker.internet.password();
      const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);

      return {
        email: faker.internet.email(),
        password: hashedPassword,
      };
    })
  );

  await db.insert(users).values(usersArray);
  console.log("Users seeded successfully");
}
