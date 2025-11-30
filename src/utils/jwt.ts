import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (userId: number): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '15m'
  });
};

export const generateRefreshToken = (userId: number): string => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || 'refresh-secret', {
    expiresIn: '7d'
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret');
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh-secret');
};
