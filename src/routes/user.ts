import { Elysia } from 'elysia';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middleware/auth';
import { updateUserSchema } from '../schemas/user.schema';

export const userRoutes = new Elysia()
  // Protected routes (ต้อง auth)
  .group('/me', (app) => 
    app
      .use(authMiddleware)
      .get('/', (ctx: any) => UserController.getMe({ userId: ctx.userId }))
      .put('/', async (ctx: any) => {
        const validated = updateUserSchema.parse(ctx.body);
        return UserController.updateMe({ userId: ctx.userId, body: validated });
      })
      .delete('/', (ctx: any) => UserController.deleteMe({ userId: ctx.userId }))
  )
  // Public routes (ไม่ต้อง auth)
  .get('/users', () => UserController.findAll())
  .get('/users/:id', ({ params }: any) => UserController.getUserById(params));
