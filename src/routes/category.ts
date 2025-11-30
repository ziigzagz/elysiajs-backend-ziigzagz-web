import { Elysia, t } from 'elysia';
import { CategoryController } from '../controllers/CategoryController';

export const categoryRoutes = new Elysia({ prefix: '/categories' })
  .get('/', CategoryController.getAll, {
    query: t.Object({
      search: t.Optional(t.String())
    })
  })
  .get('/:id', CategoryController.getById, {
    params: t.Object({
      id: t.String()
    })
  })
  .get('/slug/:slug', CategoryController.getBySlug, {
    params: t.Object({
      slug: t.String()
    })
  })
  .post('/', CategoryController.create, {
    body: t.Object({
      name: t.String(),
      slug: t.String(),
      description: t.Optional(t.String())
    })
  })
  .put('/:id', CategoryController.update, {
    params: t.Object({
      id: t.String()
    }),
    body: t.Object({
      name: t.Optional(t.String()),
      slug: t.Optional(t.String()),
      description: t.Optional(t.String())
    })
  })
  .delete('/:id', CategoryController.delete, {
    params: t.Object({
      id: t.String()
    })
  });
