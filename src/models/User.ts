import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq, like, sql, asc, desc } from 'drizzle-orm';
import type { PaginationParams } from '../utils/pagination.js';

export class User {
  static async findAll() {
    return await db.select().from(users);
  }

  static async findWithPagination(params: PaginationParams) {
    const { page = 1, limit = 10, search = '', sortBy = 'id', sortOrder = 'asc' } = params;
    const offset = (page - 1) * limit;

    // Build where clause
    const whereClause = search
      ? sql`${users.email} LIKE ${`%${search}%`} OR ${users.name} LIKE ${`%${search}%`}`
      : undefined;

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(whereClause);
    const total = Number(countResult[0].count);

    // Get data with pagination
    const orderColumn = sortBy === 'email' ? users.email : 
                       sortBy === 'name' ? users.name : 
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

  static async findByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  static async create(data: { email: string; password: string; name?: string }) {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const result = await db.insert(users).values(data);
    return { id: Number(result[0].insertId), ...data };
  }

  static async update(id: number, data: Partial<{ email: string; password: string; name: string }>) {
    await db.update(users).set(data).where(eq(users.id, id));
    return this.findById(id);
  }

  static async delete(id: number) {
    return await db.delete(users).where(eq(users.id, id));
  }
}
