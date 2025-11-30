import { User } from '../models/User';

export class AuthController {
  static async register({ body }: any) {
    await User.create(body);
    return { message: 'User created successfully' };
  }

  static async login({ body }: any) {
    const { email, password } = body;
    const user = await User.findByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const accessToken = 'example_token';
    const refreshToken = 'example_refresh_token';
    
    return { accessToken, refreshToken };
  }

  static async refresh({ body }: any) {
    const { refreshToken } = body;
    const accessToken = 'new_access_token';
    
    return { accessToken };
  }
}
