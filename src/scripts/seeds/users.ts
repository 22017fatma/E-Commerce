import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { db } from "../../db/client";
import { users, addresses } from "../../models/schema";



dotenv.config();


export async function seedUsers() {
  const response = await fetch("https://fakestoreapi.com/users");
  const data = await response.json();

  await db.transaction(async (tx) => {
    for (const item of data) {
      const hashedPassword = await bcrypt.hash(item.password, Number(process.env.SALT_ROUNDS));

      //  Insert user
      const userResult = await tx
        .insert(users)
        .values({
          email: item.email,
          password: hashedPassword,
        })
        .$returningId();

      const userId = userResult[0]?.id;
      if (!userId) throw new Error("Failed to get User ID after insert");

      //  Insert address
      await tx.insert(addresses).values({
        user_id: userId,
        name: `${item.name.firstname} ${item.name.lastname}`,
        street: `${item.address.street} ${item.address.number}`,
        city: item.address.city,
        is_default: true,
      });
    }

    console.log("Users + Addresses seeded successfully ");
  });
}
