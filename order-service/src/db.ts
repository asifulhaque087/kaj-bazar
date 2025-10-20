import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@src/schemas";
import { config } from "@src/config";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
