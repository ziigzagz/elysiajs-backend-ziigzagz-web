import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { User } from './models/User';

// Schema definitions
const UserSchema = t.Object({
  id: t.Number(),
  email: t.String({ format: 'email' }),
  name: t.Union([t.String(), t.Null()]),
  createdAt: t.Date()
});

const RegisterSchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 }),
  name: t.Optional(t.String())
});

const LoginSchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String()
});

const ErrorSchema = t.Object({
  error: t.String(),
  message: t.Optional(t.String())
});

const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: 'API Documentation with Validation',
        version: '1.0.0'
      }
    }
  }))
  // Auth routes with validation
  .post('/auth/register', async ({ body, set }) => {
    try {   
      const result = await User.create(body);
      return { message: 'User created successfully', user: result[0] };
    } catch (error) {
      return { 
        error: (error as Error).message,
        message: 'Registration failed'
       };
    }
  }, {
    body: RegisterSchema,
    response: {
      201: t.Object({
        message: t.String(),
        user: UserSchema
      }),
      400: ErrorSchema,
      422: ErrorSchema
    }
  })
  .post('/auth/login', async ({ body, set }) => {
    // check email
    if (!body.email || !body.password) {
      set.status = 400;
      return { error: 'Email and password are required' };
    }

    const user = await User.findByEmail(body.email);
    if (!user) {
      set.status = 401;
      return { error: 'Invalid credentials' };
    }
    return {
      accessToken: 'jwt_token_here',
      refreshToken: 'refresh_token_here',
      user
    };
  }, {
    body: LoginSchema,
    response: {
      200: t.Object({
        accessToken: t.String(),
        refreshToken: t.String(),
        user: UserSchema
      }),
      401: ErrorSchema
    }
  })
  .post('/auth/refresh', async ({ body }) => {
    return { accessToken: 'new_jwt_token' };
  }, {
    body: t.Object({
      refreshToken: t.String()
    }),
    response: {
      200: t.Object({
        accessToken: t.String()
      }),
      401: ErrorSchema
    }
  })
  // User routes
  .get('/me', async () => {
    const user = await User.findById(1);
    return user || { id: 1, email: 'user@example.com', name: 'John', createdAt: new Date().toISOString() };
  }, {
    response: {
      200: UserSchema,
      404: ErrorSchema
    }
  })
  .put('/me', async ({ body }) => {
    const result = await User.update(1, body);
    return { message: 'User updated', user: result[0] };
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
      email: t.Optional(t.String({ format: 'email' }))
    }),
    response: {
      200: t.Object({
        message: t.String(),
        user: UserSchema
      }),
      400: ErrorSchema
    }
  })
  .delete('/me', async () => {
    await User.delete(1);
    return { message: 'User deleted' };
  }, {
    response: {
      200: t.Object({
        message: t.String()
      }),
      404: ErrorSchema
    }
  })
  .listen(3001);

console.log('📚 API with Schema Validation at http://localhost:3001/swagger');
