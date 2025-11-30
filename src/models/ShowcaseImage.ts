import { eq } from 'drizzle-orm';
import { db } from '../db';
import { showcaseImages } from '../db/schema';

export class ShowcaseImage {
  static async findByShowcaseId(showcaseId: number) {
    return db.select().from(showcaseImages).where(eq(showcaseImages.showcaseId, showcaseId));
  }

  static async create(data: { showcaseId: number; imagePath: string; altText?: string; sortOrder?: number }) {
    await db.insert(showcaseImages).values(data);
    return data;
  }

  static async bulkCreate(images: { showcaseId: number; imagePath: string; altText?: string; sortOrder: number }[]) {
    if (images.length === 0) return [];
    await db.insert(showcaseImages).values(images);
    return images;
  }

  static async delete(id: number) {
    await db.delete(showcaseImages).where(eq(showcaseImages.id, id));
  }

  static async deleteByShowcaseId(showcaseId: number) {
    await db.delete(showcaseImages).where(eq(showcaseImages.showcaseId, showcaseId));
  }
}
