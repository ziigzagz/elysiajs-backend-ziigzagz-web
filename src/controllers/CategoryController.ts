import { Category } from '../models/Category';

export class CategoryController {
  static async getAll({ query }: any) {
    const categories = await Category.findAll(query.search);
    return { success: true, data: categories };
  }

  static async getById({ params }: any) {
    const category = await Category.findById(parseInt(params.id));
    if (!category) return { success: false, message: 'Category not found' };
    return { success: true, data: category };
  }

  static async getBySlug({ params }: any) {
    const category = await Category.findBySlug(params.slug);
    if (!category) return { success: false, message: 'Category not found' };
    return { success: true, data: category };
  }

  static async create({ body }: any) {
    const category = await Category.create(body);
    return { success: true, data: category };
  }

  static async update({ params, body }: any) {
    const category = await Category.update(parseInt(params.id), body);
    if (!category) return { success: false, message: 'Category not found' };
    return { success: true, data: category };
  }

  static async delete({ params }: any) {
    await Category.delete(parseInt(params.id));
    return { success: true, message: 'Category deleted' };
  }
}
