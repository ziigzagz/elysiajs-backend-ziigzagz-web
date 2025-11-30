import { Showcase } from '../models/Showcase';
import { ShowcaseImage } from '../models/ShowcaseImage';
import { ShowcaseTag } from '../models/ShowcaseTag';

export class ShowcaseController {
  static async getAll({ query }: any) {
    const filters = {
      categoryId: query.categoryId ? parseInt(query.categoryId) : undefined,
      isPublished: query.isPublished !== undefined ? query.isPublished === 'true' : undefined,
      status: query.status,
      search: query.search
    };
    const showcases = await Showcase.findAll(filters);
    return { success: true, data: showcases };
  }

  static async getById({ params }: any) {
    const showcase = await Showcase.findById(parseInt(params.id));
    if (!showcase) return { success: false, message: 'Showcase not found' };
    return { success: true, data: showcase };
  }

  static async getBySlug({ params }: any) {
    const showcase = await Showcase.findBySlug(params.slug);
    if (!showcase) return { success: false, message: 'Showcase not found' };
    return { success: true, data: showcase };
  }

  static async create({ body }: any) {
    const { images, tags, ...showcaseData } = body;
    const showcase = await Showcase.create(showcaseData);

    if (showcase && images?.length) {
      await ShowcaseImage.bulkCreate(images.map((img: any, idx: number) => ({
        showcaseId: showcase.id,
        imagePath: img.imagePath,
        altText: img.altText,
        sortOrder: idx
      })));
    }

    if (showcase && tags?.length) {
      await ShowcaseTag.bulkCreate(tags.map((tag: string) => ({
        showcaseId: showcase.id,
        tagName: tag
      })));
    }

    return { success: true, data: showcase ? await Showcase.findById(showcase.id) : null };
  }

  static async update({ params, body }: any) {
    const { images, tags, ...showcaseData } = body;
    const showcase = await Showcase.update(parseInt(params.id), showcaseData);
    if (!showcase) return { success: false, message: 'Showcase not found' };

    if (images !== undefined) {
      await ShowcaseImage.deleteByShowcaseId(showcase.id);
      if (images.length) {
        await ShowcaseImage.bulkCreate(images.map((img: any, idx: number) => ({
          showcaseId: showcase.id,
          imagePath: img.imagePath,
          altText: img.altText,
          sortOrder: idx
        })));
      }
    }

    if (tags !== undefined) {
      await ShowcaseTag.deleteByShowcaseId(showcase.id);
      if (tags.length) {
        await ShowcaseTag.bulkCreate(tags.map((tag: string) => ({
          showcaseId: showcase.id,
          tagName: tag
        })));
      }
    }

    return { success: true, data: await Showcase.findById(showcase.id) };
  }

  static async delete({ params }: any) {
    await Showcase.delete(parseInt(params.id));
    return { success: true, message: 'Showcase deleted' };
  }

  static async publish({ params }: any) {
    const showcase = await Showcase.update(parseInt(params.id), { isPublished: true });
    if (!showcase) return { success: false, message: 'Showcase not found' };
    return { success: true, data: showcase };
  }

  static async unpublish({ params }: any) {
    const showcase = await Showcase.update(parseInt(params.id), { isPublished: false });
    if (!showcase) return { success: false, message: 'Showcase not found' };
    return { success: true, data: showcase };
  }
}
