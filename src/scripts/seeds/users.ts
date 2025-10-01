import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { db } from "../../db/client";
import { users, addresses } from "../../models/schema";
import { ROLES } from "../../types";

dotenv.config();

export async function seedUsers() {
  const response = await fetch("https://fakestoreapi.com/users");
  const data = await response.json();

  const roles = [ROLES.USER, ROLES.ADMIN];
  
  await db.transaction(async (tx) => {

    const testAccounts = [
      {
        email: "admin@test.com",
        password: "123456",
        role: ROLES.ADMIN, 
        name: "Admin User",
        street: " Street 1",
        city: "Cairo",
      },
      {
        email: "user@test.com",
        password: "123456",
        role: ROLES.USER, 
        name: "Normal User",
        street: " Street 2",
        city: "Giza",
      },
    ];

    for (const account of testAccounts) {
      const hashedPassword = await bcrypt.hash(
        account.password,
        Number(process.env.SALT_ROUNDS)
      );

      const userResult = await tx
        .insert(users)
        .values({
          email: account.email,
          password: hashedPassword,
          role: account.role, 
        })
        .$returningId();

      const userId = userResult[0]?.id;
      if (!userId) throw new Error("Failed to insert test account");

      await tx.insert(addresses).values({
        user_id: userId,
        name: account.name,
        street: account.street,
        city: account.city,
        is_default: true,
      });
    
    }
     
       //  Insert user from APIKEY

    for (const item of data) {
      const hashedPassword = await bcrypt.hash(
        item.password,
        Number(process.env.SALT_ROUNDS)
      );

      //  Insert user
      const userResult = await tx
        .insert(users)
        .values({
          email: item.email,
          password: hashedPassword,
          role: roles[Math.floor(Math.random() * roles.length)] as ROLES,
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
