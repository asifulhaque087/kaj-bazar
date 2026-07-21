import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const MIGRATE_TIMEOUT = 120_000;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set for migrations');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 30_000,
});

const db = drizzle(pool);

async function runMigrations() {
  console.log('--- Starting Drizzle Migrations ---');
  console.log('Migrations folder: ./drizzle/migrations');

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error(`Migration timed out after ${MIGRATE_TIMEOUT / 1000}s`)),
      MIGRATE_TIMEOUT,
    ),
  );

  try {
    await Promise.race([
      migrate(db, { migrationsFolder: './drizzle/migrations' }),
      timeout,
    ]);
    console.log('--- Migrations finished successfully ---');
  } catch (error) {
    console.error('Migration failed:', error);
    await pool.end().catch(() => {});
    process.exit(1);
  }

  await pool.end();
}

runMigrations();
