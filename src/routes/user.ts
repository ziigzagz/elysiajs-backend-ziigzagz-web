import { Elysia } from 'elysia';
import { UserController } from '../controllers/UserController.js';
import { authMiddleware } from '../middleware/auth.js';
import { updateUserSchema } from '../schemas/user.schema.js';

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
  .get('/users', (ctx: any) => UserController.getAllUsers({ query: ctx.query }))
  .get('/users/:id', ({ params }: any) => UserController.getUserById(params.id));
