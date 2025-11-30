import { mysqlTable, int, varchar, text, timestamp, tinyint, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: int('user_id').primaryKey().autoincrement(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email', { length: 100 }),
  fullName: varchar('full_name', { length: 100 }),
  role: mysqlEnum('role', ['admin', 'editor']).notNull().default('admin'),
  status: mysqlEnum('status', ['active', 'inactive']).notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
});

export const categories = mysqlTable('categories', {
  id: int('categories_id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
});

export const showcases = mysqlTable('showcases', {
  id: int('showcases_id').primaryKey().autoincrement(),
  categoryId: int('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  bannerImage: varchar('banner_image', { length: 255 }),
  isPublished: tinyint('is_published').notNull().default(0),
  status: mysqlEnum('status', ['active', 'inactive']).notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
});

export const showcaseImages = mysqlTable('showcase_images', {
  id: int('showcase_images_id').primaryKey().autoincrement(),
  showcaseId: int('showcase_id').notNull().references(() => showcases.id, { onDelete: 'cascade' }),
  imagePath: varchar('image_path', { length: 255 }).notNull(),
  altText: varchar('alt_text', { length: 255 }),
  sortOrder: int('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const showcaseTags = mysqlTable('showcase_tags', {
  id: int('showcase_tags_id').primaryKey().autoincrement(),
  showcaseId: int('showcase_id').notNull().references(() => showcases.id, { onDelete: 'cascade' }),
  tagName: varchar('tag_name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  showcases: many(showcases)
}));

export const showcasesRelations = relations(showcases, ({ one, many }) => ({
  category: one(categories, {
    fields: [showcases.categoryId],
    references: [categories.id]
  }),
  images: many(showcaseImages),
  tags: many(showcaseTags)
}));

export const showcaseImagesRelations = relations(showcaseImages, ({ one }) => ({
  showcase: one(showcases, {
    fields: [showcaseImages.showcaseId],
    references: [showcases.id]
  })
}));

export const showcaseTagsRelations = relations(showcaseTags, ({ one }) => ({
  showcase: one(showcases, {
    fields: [showcaseTags.showcaseId],
    references: [showcases.id]
  })
}));
