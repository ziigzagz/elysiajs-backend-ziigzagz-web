# CMS API Documentation

## Base URL
```
http://localhost:3000
```

## API Endpoints

### 1. Categories API

#### Get All Categories
```http
GET /categories
Query Parameters:
  - search (optional): Search by name or slug
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Web Development",
      "slug": "web-development",
      "description": "Website and web application projects",
      "createdAt": "2025-09-11T16:37:49.000Z",
      "updatedAt": "2025-09-11T16:37:49.000Z"
    }
  ]
}
```

#### Get Category by ID
```http
GET /categories/:id
```

#### Get Category by Slug
```http
GET /categories/slug/:slug
```

#### Create Category
```http
POST /categories
Content-Type: application/json

{
  "name": "Web Development",
  "slug": "web-development",
  "description": "Website projects"
}
```

#### Update Category
```http
PUT /categories/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description"
}
```

#### Delete Category
```http
DELETE /categories/:id
```

---

### 2. Showcases API

#### Get All Showcases
```http
GET /showcases
Query Parameters:
  - categoryId (optional): Filter by category ID
  - isPublished (optional): Filter by published status (true/false)
  - status (optional): Filter by status (active/inactive)
  - search (optional): Search by title or slug
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "showcase": {
        "id": 1,
        "categoryId": 2,
        "title": "Project Title",
        "slug": "project-title",
        "description": "<p>HTML content</p>",
        "bannerImage": "uploads/showcase/banners/banner.png",
        "isPublished": true,
        "status": "active",
        "createdAt": "2025-09-11T16:38:43.000Z",
        "updatedAt": "2025-11-07T14:46:18.000Z"
      },
      "category": {
        "id": 2,
        "name": "Mobile Apps",
        "slug": "mobile-apps"
      }
    }
  ]
}
```

#### Get Showcase by ID (with images and tags)
```http
GET /showcases/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "showcase": { ... },
    "category": { ... },
    "images": [
      {
        "id": 1,
        "showcaseId": 1,
        "imagePath": "uploads/showcase/images/image.png",
        "altText": "Image description",
        "sortOrder": 0,
        "createdAt": "2025-09-11T16:38:43.000Z"
      }
    ],
    "tags": [
      {
        "id": 1,
        "showcaseId": 1,
        "tagName": "react",
        "createdAt": "2025-11-07T14:46:18.000Z"
      }
    ]
  }
}
```

#### Get Showcase by Slug
```http
GET /showcases/slug/:slug
```

#### Create Showcase
```http
POST /showcases
Content-Type: application/json

{
  "categoryId": 1,
  "title": "My Project",
  "slug": "my-project",
  "description": "<p>Project description</p>",
  "bannerImage": "uploads/showcase/banners/banner.jpg",
  "isPublished": false,
  "status": "active",
  "images": [
    {
      "imagePath": "uploads/showcase/images/img1.jpg",
      "altText": "Screenshot 1"
    },
    {
      "imagePath": "uploads/showcase/images/img2.jpg",
      "altText": "Screenshot 2"
    }
  ],
  "tags": ["react", "typescript", "tailwind"]
}
```

#### Update Showcase
```http
PUT /showcases/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "<p>Updated content</p>",
  "images": [...],
  "tags": [...]
}
```

**Note:** When updating images or tags, the entire array will be replaced.

#### Delete Showcase
```http
DELETE /showcases/:id
```

#### Publish Showcase
```http
PATCH /showcases/:id/publish
```

#### Unpublish Showcase
```http
PATCH /showcases/:id/unpublish
```

---

### 3. Upload API

#### Upload Banner Image
```http
POST /upload/banner
Content-Type: multipart/form-data

file: [binary file]
```

**Response:**
```json
{
  "success": true,
  "filepath": "uploads/showcase/banners/1234567890_banner.jpg"
}
```

#### Upload Multiple Images
```http
POST /upload/images
Content-Type: multipart/form-data

files: [binary files array]
```

**Response:**
```json
{
  "success": true,
  "filepaths": [
    "uploads/showcase/images/1234567890_img1.jpg",
    "uploads/showcase/images/1234567891_img2.jpg"
  ]
}
```

---

## Complete Workflow Example

### Creating a Showcase with Images

1. **Upload banner image:**
```bash
curl -X POST http://localhost:3000/upload/banner \
  -F "file=@banner.jpg"
```

2. **Upload showcase images:**
```bash
curl -X POST http://localhost:3000/upload/images \
  -F "files=@image1.jpg" \
  -F "files=@image2.jpg"
```

3. **Create showcase:**
```bash
curl -X POST http://localhost:3000/showcases \
  -H "Content-Type: application/json" \
  -d '{
    "categoryId": 1,
    "title": "My Awesome Project",
    "slug": "my-awesome-project",
    "description": "<p>Project details</p>",
    "bannerImage": "uploads/showcase/banners/1234567890_banner.jpg",
    "isPublished": true,
    "status": "active",
    "images": [
      {
        "imagePath": "uploads/showcase/images/1234567890_image1.jpg",
        "altText": "Screenshot 1"
      },
      {
        "imagePath": "uploads/showcase/images/1234567891_image2.jpg",
        "altText": "Screenshot 2"
      }
    ],
    "tags": ["react", "nodejs", "mongodb"]
  }'
```

---

## Error Responses

### Validation Error
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Required"
    }
  ]
}
```

### Not Found
```json
{
  "success": false,
  "message": "Showcase not found"
}
```

### Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Database Schema

### Tables
- **users**: Admin/editor accounts
- **categories**: Showcase categories
- **showcases**: Main showcase content
- **showcase_images**: Multiple images per showcase
- **showcase_tags**: Tags for showcases

### Relationships
- Showcase belongs to Category (cascade delete)
- Showcase has many Images (cascade delete)
- Showcase has many Tags (cascade delete)

---

## Features

✅ Full CRUD operations for Categories and Showcases
✅ File upload support (banner + multiple images)
✅ Search and filtering
✅ Publish/unpublish functionality
✅ Slug-based routing
✅ Relational data (category, images, tags)
✅ Validation with Elysia types
✅ Auto-generated Swagger documentation
✅ SQLite with Drizzle ORM
