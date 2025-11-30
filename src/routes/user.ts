import { Elysia } from 'elysia';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middleware/auth';
import { updateUserSchema } from '../schemas/user.schema';

export const userRoutes = new Elysia()
  .use(authMiddleware)
  .get('/me', (ctx: any) => UserController.getMe({ userId: ctx.userId }))
  .put('/me', async (ctx: any) => {
    const validated = updateUserSchema.parse(ctx.body);
    return UserController.updateMe({ userId: ctx.userId, body: validated });
  })
  .delete('/me', (ctx: any) => UserController.deleteMe({ userId: ctx.userId }));
