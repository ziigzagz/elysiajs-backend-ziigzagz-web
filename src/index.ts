import 'dotenv/config';
import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { yoga } from '@elysiajs/graphql-yoga';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { categoryRoutes } from './routes/category';
import { showcaseRoutes } from './routes/showcase';
import { uploadRoutes } from './routes/upload';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
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
    .use(
      yoga({
        typeDefs,
        resolvers,
        graphqlEndpoint: '/graphql',
        graphiql: true,
      })
    )
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
    .get('/', () => 'Hello Elysia CMS API')
    .use(authRoutes)
    .use(userRoutes)
    .use(categoryRoutes)
    .use(showcaseRoutes)
    .use(uploadRoutes);
};

// Auto-start server
createApp().then(app => {
  app.listen(port, () => {
    console.log(`🦊 Elysia is running at http://localhost:${port}`);
    console.log(`🚀 GraphQL Playground: http://localhost:${port}/graphql`);
  });
});
