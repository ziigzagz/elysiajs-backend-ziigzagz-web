import * as schema from './schema';

let db: any;

// Check if running in Bun environment
const isBun = typeof process !== 'undefined' && process.versions?.bun;

if (isBun) {
  // Bun environment
  const { Database } = require('bun:sqlite');
  const { drizzle } = require('drizzle-orm/bun-sqlite');
  const sqlite = new Database('sqlite.db');
  db = drizzle(sqlite, { schema });
} else {
  // Node.js environment
  const Database = require('better-sqlite3');
  const { drizzle } = require('drizzle-orm/better-sqlite3');
  const sqlite = new Database('sqlite.db');
  db = drizzle(sqlite, { schema });
}

export { db };
