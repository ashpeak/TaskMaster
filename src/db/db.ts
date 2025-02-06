import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Disable SSL certificate validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    ca: Buffer.from(process.env.POSTGRESQL_CA_PEM!, 'base64').toString('utf-8'),
    rejectUnauthorized: true,
  } : false,
});

// Initialize Drizzle ORM with the connection pool
const db = drizzle(pool);

export default db;