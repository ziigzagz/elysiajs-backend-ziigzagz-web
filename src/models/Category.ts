import { eq, like, or } from 'drizzle-orm';
import { db } from '../db';
import { categories } from '../db/schema';

export class Category {
  static async findAll(search?: string) {
    if (search) {
      return db.select().from(categories)
        .where(or(like(categories.name, `%${search}%`), like(categories.slug, `%${search}%`)));
    }
    return db.select().from(categories);
  }

  static async findById(id: number) {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }

  static async findBySlug(slug: string) {
    const result = await db.select().from(categories).where(eq(categories.slug, slug));
    return result[0];
  }

  static async create(data: { name: string; slug: string; description?: string }) {
    // check for existing category with same slug
    const existingCategory = await this.findBySlug(data.slug);
    if (existingCategory) {
      throw new Error('Category with this slug already exists');
    }
    const result = await db.insert(categories).values(data);
    return this.findById(Number(result[0]?.insertId));
  }

  static async update(id: number, data: { name?: string; slug?: string; description?: string }) {
    await db.update(categories).set(data).where(eq(categories.id, id));
    return this.findById(id);
  }

  static async delete(id: number) {
    await db.delete(categories).where(eq(categories.id, id));
  }
}
