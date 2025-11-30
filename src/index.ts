import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { authRoutes } from './routes/auth.js';
import { userRoutes } from './routes/user.js';
import { ZodError } from 'zod';

const port = Number(process.env.PORT) || 3000;
const isBun = typeof (globalThis as any).Bun !== 'undefined';

// Create app with Node adapter if running in Node.js
const createApp = async () => {
  let app = new Elysia(
    isBun ? {} : { adapter: (await import('@elysiajs/node')).node() }
  );

  return app
    .use(swagger())
    .onError(({ error, set }: any) => {
      if (error instanceof ZodError) {
        set.status = 400;
        return {
          error: 'Validation failed',
          status: false,
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
    .use(userRoutes);
};

// Auto-start server
createApp().then(app => {
  app.listen(port, () => {
    console.log(`🦊 Elysia is running at http://localhost:${port}`);
  });
});
