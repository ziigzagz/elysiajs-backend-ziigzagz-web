import { User } from '../models/User';

export class UserController {
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
}
