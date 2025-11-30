import { Elysia, t } from 'elysia';
import { AuthController } from '../controllers/AuthController';
import { registerSchema, loginSchema, refreshSchema } from '../schemas/auth.schema';

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post('/register', async ({ body }) => {
    const validated = registerSchema.parse(body);
    return AuthController.register({ body: validated });
  })
  .post('/login', async ({ body }) => {
    const validated = loginSchema.parse(body);
    return AuthController.login({ body: validated });
  })
  .post('/refresh', async ({ body }) => {
    const validated = refreshSchema.parse(body);
    return AuthController.refresh({ body: validated });
  });
