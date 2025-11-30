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

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const results = await db.execute(sql`
      SELECT 
        s.showcases_id, s.category_id, s.title, s.slug, s.description, 
        s.banner_image, s.is_published, s.status, s.created_at, s.updated_at,
        c.categories_id as category_id_ref, c.name as category_name, c.slug as category_slug, c.description as category_description
      FROM showcases s
      LEFT JOIN categories c ON s.category_id = c.categories_id
      ${whereClause ? sql`WHERE ${whereClause}` : sql``}
    `);

    return (results as any).map((row: any) => ({
      showcase: {
        id: row.showcases_id,
        categoryId: row.category_id,
        title: row.title,
        slug: row.slug,
        description: row.description,
        bannerImage: row.banner_image,
        isPublished: row.is_published,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      },
      category: row.category_name ? {
        id: row.category_id_ref,
        name: row.category_name,
        slug: row.category_slug,
        description: row.category_description
      } : null
    }));
  }

  static async findById(id: number) {
    const result: any = await db.execute(sql`
      SELECT 
        s.showcases_id, s.category_id, s.title, s.slug, s.description, 
        s.banner_image, s.is_published, s.status, s.created_at, s.updated_at,
        c.categories_id as category_id_ref, c.name as category_name, c.slug as category_slug, c.description as category_description
      FROM showcases s
      LEFT JOIN categories c ON s.category_id = c.categories_id
      WHERE s.showcases_id = ${id}
    `);

    if (!result[0]) return null;

    const row = result[0];
    const images = await db.select().from(showcaseImages).where(eq(showcaseImages.showcaseId, id));
    const tags = await db.select().from(showcaseTags).where(eq(showcaseTags.showcaseId, id));

    return {
      id: row.showcases_id,
      categoryId: row.category_id,
      title: row.title,
      slug: row.slug,
      description: row.description,
      bannerImage: row.banner_image,
      isPublished: row.is_published,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      category: row.category_name ? {
        id: row.category_id_ref,
        name: row.category_name,
        slug: row.category_slug,
        description: row.category_description
      } : null,
      images,
      tags
    };
  }

  static async findBySlug(slug: string) {
    const result: any = await db.execute(sql`
      SELECT 
        s.showcases_id, s.category_id, s.title, s.slug, s.description, 
        s.banner_image, s.is_published, s.status, s.created_at, s.updated_at,
        c.categories_id as category_id_ref, c.name as category_name, c.slug as category_slug, c.description as category_description
      FROM showcases s
      LEFT JOIN categories c ON s.category_id = c.categories_id
      WHERE s.slug = ${slug}
    `);

    if (!result[0]) return null;

    const row = result[0];
    const images = await db.select().from(showcaseImages).where(eq(showcaseImages.showcaseId, row.showcases_id));
    const tags = await db.select().from(showcaseTags).where(eq(showcaseTags.showcaseId, row.showcases_id));

    return {
      id: row.showcases_id,
      categoryId: row.category_id,
      title: row.title,
      slug: row.slug,
      description: row.description,
      bannerImage: row.banner_image,
      isPublished: row.is_published,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      category: row.category_name ? {
        id: row.category_id_ref,
        name: row.category_name,
        slug: row.category_slug,
        description: row.category_description
      } : null,
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
    
    const result: any = await db.insert(showcases).values(insertData);
    return this.findById(Number(result.insertId));
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
