import bcrypt from "bcrypt";
import { db } from "../db/client";
import { users } from "../models/schema";
import { eq } from "drizzle-orm";



export async function verifyUserPassword(email: string, plainPassword: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    throw new Error("Invalid credentials");
  }

     // Match pass
  const match = await bcrypt.compare(plainPassword, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }

  const { password: _pw, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
