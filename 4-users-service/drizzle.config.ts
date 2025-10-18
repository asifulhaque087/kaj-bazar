import { config } from "@src/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "src/drizzle/migrations",
  schema: "src/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DATABASE_URL,
  },
});
