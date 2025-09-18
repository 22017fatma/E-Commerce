import { faker } from "@faker-js/faker";
import { db } from "../../db/client";
import { users } from "../../models/schema";

export async function seedUser(count = 10) {
  const usersArray = Array.from({ length: count }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));
  await db.insert(users).values(usersArray);
  console.log("Users done");
}
