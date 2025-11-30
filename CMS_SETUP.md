# CMS API Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
bun install
```

### 2. Generate Database Schema
```bash
bunx drizzle-kit generate
```

### 3. Run Migrations
```bash
bunx drizzle-kit migrate
```

### 4. Seed Database (Optional)
```bash
bun src/db/migrate.ts
```

This will create:
- 4 categories (Web Development, Mobile Apps, Design, E-commerce)
- 1 admin user (username: `admin`, password: `admin123`)

### 5. Start Development Server
```bash
bun run dev
```

Server will run at: http://localhost:3000

### 6. View API Documentation
Open: http://localhost:3000/swagger

---

## 📁 Project Structure

```
src/
├── controllers/
│   ├── CategoryController.ts      # Category CRUD operations
│   ├── ShowcaseController.ts      # Showcase CRUD + publish/unpublish
│   └── UserController.ts
├── models/
│   ├── Category.ts                # Category database queries
│   ├── Showcase.ts                # Showcase database queries
│   ├── ShowcaseImage.ts           # Image management
│   ├── ShowcaseTag.ts             # Tag management
│   └── User.ts
├── routes/
│   ├── category.ts                # Category endpoints
│   ├── showcase.ts                # Showcase endpoints
│   ├── upload.ts                  # File upload endpoints
│   └── auth.ts
├── schemas/
│   ├── category.schema.ts         # Category validation
│   └── showcase.schema.ts         # Showcase validation
├── db/
│   ├── schema.ts                  # Database schema (Drizzle ORM)
│   ├── index.ts                   # Database connection
│   └── migrate.ts                 # Seed script
└── utils/
    ├── upload.ts                  # File upload utility
    └── pagination.ts
```

---

## 🗄️ Database Schema

### Tables
1. **users** - Admin/editor accounts
2. **categories** - Showcase categories
3. **showcases** - Main showcase content
4. **showcase_images** - Multiple images per showcase
5. **showcase_tags** - Tags for showcases

### Relationships
- Showcase → Category (many-to-one, cascade delete)
- Showcase → Images (one-to-many, cascade delete)
- Showcase → Tags (one-to-many, cascade delete)

---

## 🔌 API Endpoints

### Categories
- `GET /categories` - List all categories
- `GET /categories/:id` - Get category by ID
- `GET /categories/slug/:slug` - Get category by slug
- `POST /categories` - Create category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Showcases
- `GET /showcases` - List all showcases (with filters)
- `GET /showcases/:id` - Get showcase with images & tags
- `GET /showcases/slug/:slug` - Get showcase by slug
- `POST /showcases` - Create showcase
- `PUT /showcases/:id` - Update showcase
- `DELETE /showcases/:id` - Delete showcase
- `PATCH /showcases/:id/publish` - Publish showcase
- `PATCH /showcases/:id/unpublish` - Unpublish showcase

### Upload
- `POST /upload/banner` - Upload banner image
- `POST /upload/images` - Upload multiple images

---

## 📝 Usage Examples

### Create Category
```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Web Development",
    "slug": "web-development",
    "description": "Web projects"
  }'
```

### Create Showcase with Images & Tags
```bash
curl -X POST http://localhost:3000/showcases \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": 1,
    "title": "My Project",
    "slug": "my-project",
    "description": "<p>Project description</p>",
    "bannerImage": "uploads/showcase/banners/banner.jpg",
    "isPublished": true,
    "status": "active",
    "images": [
      {
        "imagePath": "uploads/showcase/images/img1.jpg",
        "altText": "Screenshot 1"
      }
    ],
    "tags": ["react", "typescript"]
  }'
```

### Filter Showcases
```bash
# Get published showcases in category 1
curl "http://localhost:3000/showcases?categoryId=1&isPublished=true"

# Search showcases
curl "http://localhost:3000/showcases?search=project"
```

### Upload Files
```bash
# Upload banner
curl -X POST http://localhost:3000/upload/banner \
  -F "file=@banner.jpg"

# Upload multiple images
curl -X POST http://localhost:3000/upload/images \
  -F "files=@img1.jpg" \
  -F "files=@img2.jpg"
```

---

## ✨ Features

✅ **Full CRUD** - Complete Create, Read, Update, Delete operations
✅ **File Upload** - Banner and multiple image support
✅ **Search & Filter** - Query by category, status, published state
✅ **Slug Routing** - SEO-friendly URLs
✅ **Relational Data** - Auto-load category, images, tags
✅ **Publish Control** - Publish/unpublish showcases
✅ **Validation** - Type-safe with Elysia schemas
✅ **Auto Documentation** - Swagger UI included
✅ **SQLite** - Lightweight database with Drizzle ORM

---

## 🔧 Configuration

### Database
Database file: `./db.sqlite`

To reset database:
```bash
rm db.sqlite
bunx drizzle-kit migrate
bun src/db/migrate.ts
```

### Upload Directory
Files are saved to:
- Banners: `uploads/showcase/banners/`
- Images: `uploads/showcase/images/`

---

## 📚 Additional Documentation

See `API_DOCUMENTATION.md` for complete API reference.
