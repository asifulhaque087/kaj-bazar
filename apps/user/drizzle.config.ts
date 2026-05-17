import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: 'drizzle/migrations',
  schema: 'src/schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});
