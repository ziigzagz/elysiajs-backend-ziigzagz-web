import { Elysia } from 'elysia';
import { node } from '@elysiajs/node';
import { swagger } from '@elysiajs/swagger';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { ZodError } from 'zod';

const port = Number(process.env.PORT) || 3000;

const app = new Elysia({ adapter: node() })
  .use(swagger())
  .onError(({ error, set }: any) => {
    if (error instanceof ZodError) {
      set.status = 400;
      return {
        error: 'Validation failed',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      };
    }
    
    set.status = 500;
    return { error: error?.message || 'Internal server error' };
  })
  .get('/', () => 'Hello Elysia')
  .use(authRoutes)
  .use(userRoutes)
  .listen(port, () => {
    console.log(`🦊 Elysia is running at http://localhost:${port}`);
  });
