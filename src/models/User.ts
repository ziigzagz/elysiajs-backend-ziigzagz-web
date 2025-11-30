import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export class User {
  static async findById(id: number) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  static async findByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  static async create(data: { email: string; password: string; name?: string }) {
    // check if user exists
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    return await db.insert(users).values(data).returning();
  }

  static async update(id: number, data: Partial<{ email: string; password: string; name: string }>) {
    return await db.update(users).set(data).where(eq(users.id, id)).returning();
  }

  static async delete(id: number) {
    return await db.delete(users).where(eq(users.id, id));
  }
}
