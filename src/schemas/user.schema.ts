import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email format').optional()
});

// get user schema
export const getUserSchema = z.object({
  id: z.number().int().positive('ID must be a positive integer')
});

// respose schema for user data
export const userResponseSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  name: z.string().optional()
});
