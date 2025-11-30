import { User } from '../models/User.js';
import { getPaginationParams, createPaginationResult } from '../utils/pagination.js';

export class UserController {
  // Protected endpoints
  static async getMe({ userId }: any) {
    const user = await User.findById(userId || 1);
    return user || {};
  }

  static async updateMe({ userId, body }: any) {
    await User.update(userId || 1, body);
    return { message: 'User updated' };
  }

  static async deleteMe({ userId }: any) {
    await User.delete(userId || 1);
    return { message: 'User deleted' };
  }

  // Public endpoints
  static async findAll() {
    const users = await User.findAll(100);
    return users;
  }

  // Public endpoints
  static async getAllUsers({ query }: any) {
    const params = getPaginationParams(query);
    const { data, total } = await User.findWithPagination(params);
    return createPaginationResult(data, total, params.page!, params.limit!);
  }

  static async getUserById(id: string) {
    const user = await User.findById(Number(id));
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
