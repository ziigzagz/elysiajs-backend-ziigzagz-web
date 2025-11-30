import { Elysia, t } from 'elysia';
import { ShowcaseController } from '../controllers/ShowcaseController';

export const showcaseRoutes = new Elysia({ prefix: '/showcases' })
  .get('/', ShowcaseController.getAll, {
    query: t.Object({
      categoryId: t.Optional(t.String()),
      isPublished: t.Optional(t.String()),
      status: t.Optional(t.String()),
      search: t.Optional(t.String())
    })
  })
  .get('/:id', ShowcaseController.getById, {
    params: t.Object({
      id: t.String()
    })
  })
  .get('/slug/:slug', ShowcaseController.getBySlug, {
    params: t.Object({
      slug: t.String()
    })
  })
  .post('/', ShowcaseController.create, {
    body: t.Object({
      categoryId: t.Number(),
      title: t.String(),
      slug: t.String(),
      description: t.Optional(t.String()),
      bannerImage: t.Optional(t.String()),
      isPublished: t.Optional(t.Boolean()),
      status: t.Optional(t.String()),
      images: t.Optional(t.Array(t.Object({
        imagePath: t.String(),
        altText: t.Optional(t.String())
      }))),
      tags: t.Optional(t.Array(t.String()))
    })
  })
  .put('/:id', ShowcaseController.update, {
    params: t.Object({
      id: t.String()
    }),
    body: t.Object({
      categoryId: t.Optional(t.Number()),
      title: t.Optional(t.String()),
      slug: t.Optional(t.String()),
      description: t.Optional(t.String()),
      bannerImage: t.Optional(t.String()),
      isPublished: t.Optional(t.Boolean()),
      status: t.Optional(t.String()),
      images: t.Optional(t.Array(t.Object({
        imagePath: t.String(),
        altText: t.Optional(t.String())
      }))),
      tags: t.Optional(t.Array(t.String()))
    })
  })
  .delete('/:id', ShowcaseController.delete, {
    params: t.Object({
      id: t.String()
    })
  })
  .patch('/:id/publish', ShowcaseController.publish, {
    params: t.Object({
      id: t.String()
    })
  })
  .patch('/:id/unpublish', ShowcaseController.unpublish, {
    params: t.Object({
      id: t.String()
    })
  });
