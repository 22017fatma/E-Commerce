import { db } from "../../db/client";
import { addresses } from "../../models/schema";

export async function seedAddresses() {
  
    const userList = await db.query.users.findMany();

    if (userList.length === 0) {
      throw new Error("No users found. Seed users first.");
    }
    const addressData = userList.map((user, index) => ({
      user_id: user.id,
      name: `Address ${index + 1}`,
      street: `Street ${index + 1}`,
      city: `City ${index + 1}`,
      is_default: index === 0, 
    }));

    await db.insert(addresses).values(addressData);

    console.log(" Addresses seeded successfully");
 
}
