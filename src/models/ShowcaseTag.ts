import { eq } from 'drizzle-orm';
import { db } from '../db';
import { showcaseTags } from '../db/schema';

export class ShowcaseTag {
  static async findByShowcaseId(showcaseId: number) {
    return db.select().from(showcaseTags).where(eq(showcaseTags.showcaseId, showcaseId));
  }

  static async create(data: { showcaseId: number; tagName: string }) {
    await db.insert(showcaseTags).values(data);
    return data;
  }

  static async bulkCreate(tags: { showcaseId: number; tagName: string }[]) {
    if (tags.length === 0) return [];
    await db.insert(showcaseTags).values(tags);
    return tags;
  }

  static async delete(id: number) {
    await db.delete(showcaseTags).where(eq(showcaseTags.id, id));
  }

  static async deleteByShowcaseId(showcaseId: number) {
    await db.delete(showcaseTags).where(eq(showcaseTags.showcaseId, showcaseId));
  }
}
