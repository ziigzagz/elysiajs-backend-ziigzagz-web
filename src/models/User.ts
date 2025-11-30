import { db } from '../db/index';
import { users } from '../db/schema';
import { eq, like, sql, asc, desc } from 'drizzle-orm';
import type { PaginationParams } from '../utils/pagination';

export class User {
  static async findAll(limit: number = 100) {
    return await db.select().from(users).limit(limit);
  }

  static async findWithPagination(params: PaginationParams) {
    const { page = 1, limit = 10, search = '', sortBy = 'id', sortOrder = 'asc' } = params;
    const offset = (page - 1) * limit;

    const whereClause = search
      ? sql`${users.email} LIKE ${`%${search}%`} OR ${users.username} LIKE ${`%${search}%`}`
      : undefined;

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(whereClause);
    const total = Number(countResult[0].count);

    const orderColumn = sortBy === 'email' ? users.email : 
                       sortBy === 'username' ? users.username : 
                       sortBy === 'createdAt' ? users.createdAt : 
                       users.id;
    
    const data = await db
      .select()
      .from(users)
      .where(whereClause)
      .orderBy(sortOrder === 'desc' ? desc(orderColumn) : asc(orderColumn))
      .limit(limit)
      .offset(offset);

    return { data, total };
  }

  static async findById(id: number) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  static async findByUsername(username: string) {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  static async findByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email!));
    return result[0];
  }

  static async create(data: { username: string; password: string; email?: string; fullName?: string }) {
    const existingUser = await this.findByUsername(data.username);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const result = await db.insert(users).values(data);
    return this.findById(Number(result[0]?.insertId));
  }

  static async update(id: number, data: Partial<{ username: string; password: string; email: string; fullName: string }>) {
    await db.update(users).set(data).where(eq(users.id, id));
    return this.findById(id);
  }

  static async delete(id: number) {
    return await db.delete(users).where(eq(users.id, id));
  }
}
