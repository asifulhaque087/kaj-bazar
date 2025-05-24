// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   schema: "./drizzle/schemas",
//   out: "./drizzle/migrations",
//   dialect: "sqlite",
//   dbCredentials: {
//     url: "./drizzle/sqlite.db",
//   },
//   verbose: true,
//   // strict: true,
// });


// import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { config } from './src/config';

export default defineConfig({
  out: './drizzle/migrations',
  schema: './drizzle/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: config.MYSQL_DB!,
  },
});
