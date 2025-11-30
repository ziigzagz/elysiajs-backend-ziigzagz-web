import { Elysia } from 'elysia';
import { verifyAccessToken } from '../utils/jwt';

export const authMiddleware = new Elysia()
  .derive(({ headers }) => {
    const authHeader = headers.authorization;
    if (!authHeader) {
      throw new Error('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token) as any;
    
    return { userId: decoded.userId };
  });
