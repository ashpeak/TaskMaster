import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

// Disable SSL certificate validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/index.ts', // all files are exported from index.ts file
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: process.env.NODE_ENV === 'production' ? {
      ca: Buffer.from(process.env.POSTGRESQL_CA_PEM!, 'base64').toString('utf-8'),
      rejectUnauthorized: true,
    } : false,
  },
});