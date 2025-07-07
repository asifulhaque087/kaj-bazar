import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@src/drizzle/schema";
import { config } from "@src/config";

const connection = await mysql.createConnection(config.MYSQL_DB);

export const db = drizzle(connection, {
  schema: schema,
  mode: "default", // Optional, can also be 'planetscale' depending on your DB
});
