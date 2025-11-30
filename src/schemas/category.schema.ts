import { t } from 'elysia';

export const categorySchema = t.Object({
  name: t.String({ minLength: 1 }),
  slug: t.String({ minLength: 1 }),
  description: t.Optional(t.String())
});

export const categoryUpdateSchema = t.Object({
  name: t.Optional(t.String({ minLength: 1 })),
  slug: t.Optional(t.String({ minLength: 1 })),
  description: t.Optional(t.String())
});
