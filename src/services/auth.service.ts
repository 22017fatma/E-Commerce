import bcrypt from "bcrypt";
import { db } from "../db/client";
import { users } from "../models/schema";
import { eq } from "drizzle-orm";

export class AuthError extends Error {
  status: number;
  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

export async function verifyUserPassword(email: string, plainPassword: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    throw new AuthError("Invalid credentials", 401);
  }

     // Match pass
  const match = await bcrypt.compare(plainPassword, user.password);
  if (!match) {
    throw new AuthError("Invalid credentials", 401);
  }

  const { password: _pw, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
