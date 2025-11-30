# Elysia with Bun runtime

## Tech Stack
- **Runtime**: Bun
- **Framework**: Elysia (for API Spec)
- **ORM**: Drizzle ORM with bun:sqlite
- **Database**: SQLite
- **API Documentation**: Swagger UI

## Quick Start (รันโปรเจคพร้อม API Spec)
```bash
# 1. Install dependencies
bun install

# 2. Setup database
bunx drizzle-kit generate
bunx drizzle-kit migrate

# 3. Run main app (Terminal 1)
bun run dev

# 4. Run API documentation (Terminal 2)
bun src/swagger.ts
```

**URLs:**
- Main App: http://localhost:3000
- API Docs: http://localhost:3001/swagger

## Getting Started
```bash
bun create elysia ./elysia-example
```

## Installation
```bash
bun install
```

## Database Setup
```bash
# Generate migrations
bunx drizzle-kit generate

# Run migrations
bunx drizzle-kit migrate
```

## Development

### Run Main Application
```bash
bun run dev
```
Open http://localhost:3000/

### Run with API Spec Documentation
```bash
bun src/swagger.ts
```
- **API Documentation**: http://localhost:3001/swagger
- **Auto-generated** from existing MVC routes

## Project Structure
```
src/
├── controllers/     # Request handlers
├── models/         # Database models (Drizzle ORM)
├── routes/         # Route definitions
├── db/            # Database schema & connection
├── middleware/    # Auth & other middleware
└── swagger.ts     # Auto API spec generator
```

## Database Models
- Object-based queries (no SQL needed)
- TypeScript autocomplete
- Example: `User.findById(1)`, `User.create({...})`