import { User } from '../models/User';
import { verifyAccessToken } from '../utils/jwt';

export const resolvers = {
  Query: {
    users: async () => {
      const users = await User.findAll();
      return users.map(u => ({
        ...u,
        createdAt: u.createdAt.toISOString()
      }));
    },
    
    user: async (_: any, { id }: { id: number }) => {
      const user = await User.findById(id);
      if (!user) return null;
      return {
        ...user,
        createdAt: user.createdAt.toISOString()
      };
    },
    
    me: async (_: any, __: any, context: any) => {
      const token = context.request.headers.get('authorization')?.split(' ')[1];
      if (!token) throw new Error('Not authenticated');
      
      const decoded = verifyAccessToken(token) as any;
      const user = await User.findById(decoded.userId);
      if (!user) return null;
      return {
        ...user,
        createdAt: user.createdAt.toISOString()
      };
    },
  },

  Mutation: {
    register: async (_: any, { email, password, name }: any) => {
      const user = await User.create({ username: email, password, email, fullName: name });
      return {
        ...user,
        createdAt: new Date().toISOString()
      };
    },
    
    login: async (_: any, { email, password }: any) => {
      const user = await User.findByEmail(email);
      if (!user) throw new Error('Invalid credentials');
      
      // TODO: verify password with bcrypt
      const accessToken = 'example_token';
      const refreshToken = 'example_refresh_token';
      
      return { accessToken, refreshToken };
    },
  },
};
