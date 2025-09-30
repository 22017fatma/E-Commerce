import { db } from "../db/client";
import { users } from "../models/schema";
import { eq} from "drizzle-orm";

export class UserService {
  async getAllUsers() {
    return await db.select().from(users);
  }

  async getUserById(id: number) {
    return await db.select().from(users).where(eq(users.id, id));
  }

  async createUser(data: { name: string; email: string; password: string }) {
    return await db.insert(users).values(data);
  }

  async deleteUser(id: number) {
    return await db.delete(users).where(eq(users.id,id));
  }
}
