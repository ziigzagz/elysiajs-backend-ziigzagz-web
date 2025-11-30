import { t } from 'elysia';

export const showcaseSchema = t.Object({
  categoryId: t.Number(),
  title: t.String({ minLength: 1 }),
  slug: t.String({ minLength: 1 }),
  description: t.Optional(t.String()),
  bannerImage: t.Optional(t.String()),
  isPublished: t.Optional(t.Boolean()),
  status: t.Optional(t.Union([t.Literal('active'), t.Literal('inactive')])),
  images: t.Optional(t.Array(t.Object({
    imagePath: t.String(),
    altText: t.Optional(t.String())
  }))),
  tags: t.Optional(t.Array(t.String()))
});

export const showcaseUpdateSchema = t.Object({
  categoryId: t.Optional(t.Number()),
  title: t.Optional(t.String({ minLength: 1 })),
  slug: t.Optional(t.String({ minLength: 1 })),
  description: t.Optional(t.String()),
  bannerImage: t.Optional(t.String()),
  isPublished: t.Optional(t.Boolean()),
  status: t.Optional(t.Union([t.Literal('active'), t.Literal('inactive')])),
  images: t.Optional(t.Array(t.Object({
    imagePath: t.String(),
    altText: t.Optional(t.String())
  }))),
  tags: t.Optional(t.Array(t.String()))
});
