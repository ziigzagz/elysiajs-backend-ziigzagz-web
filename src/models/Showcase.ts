import { eq, like, or, and, sql } from 'drizzle-orm';
import { db } from '../db';
import { showcases, showcaseImages, showcaseTags, categories } from '../db/schema';

export class Showcase {
  static async findAll(filters?: { categoryId?: number; isPublished?: boolean; status?: string; search?: string }) {
    const conditions = [];
    if (filters?.categoryId) conditions.push(eq(showcases.categoryId, filters.categoryId));
    if (filters?.isPublished !== undefined) conditions.push(eq(showcases.isPublished, filters.isPublished ? 1 : 0));
    if (filters?.status) conditions.push(eq(showcases.status, filters.status as 'active' | 'inactive'));
    if (filters?.search) {
      conditions.push(or(
        like(showcases.title, `%${filters.search}%`),
        like(showcases.slug, `%${filters.search}%`)
      ));
    }

    const query = db
      .select({
        showcase: showcases,
        category: categories
      })
      .from(showcases)
      .leftJoin(categories, eq(showcases.categoryId, categories.id));

    const results = conditions.length > 0 
      ? await query.where(and(...conditions))
      : await query;

    return results.map(row => ({
      showcase: row.showcase,
      category: row.category
    }));
  }

  static async findById(id: number) {
    const result = await db
      .select({
        showcase: showcases,
        category: categories
      })
      .from(showcases)
      .leftJoin(categories, eq(showcases.categoryId, categories.id))
      .where(eq(showcases.id, id))
      .limit(1);

    if (!result[0]) return null;

    const images = await db.select().from(showcaseImages).where(eq(showcaseImages.showcaseId, id));
    const tags = await db.select().from(showcaseTags).where(eq(showcaseTags.showcaseId, id));

    return {
      ...result[0].showcase,
      category: result[0].category,
      images,
      tags
    };
  }

  static async findBySlug(slug: string) {
    const result = await db
      .select({
        showcase: showcases,
        category: categories
      })
      .from(showcases)
      .leftJoin(categories, eq(showcases.categoryId, categories.id))
      .where(eq(showcases.slug, slug))
      .limit(1);

    if (!result[0]) return null;

    const images = await db.select().from(showcaseImages).where(eq(showcaseImages.showcaseId, result[0].showcase.id));
    const tags = await db.select().from(showcaseTags).where(eq(showcaseTags.showcaseId, result[0].showcase.id));

    return {
      ...result[0].showcase,
      category: result[0].category,
      images,
      tags
    };
  }

  static async create(data: {
    categoryId: number;
    title: string;
    slug: string;
    description?: string;
    bannerImage?: string;
    isPublished?: boolean;
    status?: string;
  }) {
    const insertData: any = {
      categoryId: data.categoryId,
      title: data.title,
      slug: data.slug,
      description: data.description,
      bannerImage: data.bannerImage,
      isPublished: data.isPublished ? 1 : 0,
      status: (data.status || 'active') as 'active' | 'inactive'
    };
    
    const result = await db.insert(showcases).values(insertData);
    return this.findById(Number(result[0]?.insertId));
  }

  static async update(id: number, data: {
    categoryId?: number;
    title?: string;
    slug?: string;
    description?: string;
    bannerImage?: string;
    isPublished?: boolean;
    status?: string;
  }) {
    const updateData: any = { ...data };
    if (data.isPublished !== undefined) {
      updateData.isPublished = data.isPublished ? 1 : 0;
    }
    if (data.status) {
      updateData.status = data.status as 'active' | 'inactive';
    }
    
    await db.update(showcases).set(updateData).where(eq(showcases.id, id));
    return this.findById(id);
  }

  static async delete(id: number) {
    await db.delete(showcases).where(eq(showcases.id, id));
  }
}
