// import { drizzle } from "drizzle-orm/mysql2";
// import mysql from "mysql2/promise";
// import * as schema from "./schema";

// const poolConnection = await mysql.createConnection({
//   //   host: process.env.MYSQL_HOST,mysql_container
//   host: "mysql_container",
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DB,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// export const db = drizzle(poolConnection, {
//   schema: schema,
//   mode: "default", // Optional, can also be 'planetscale' depending on your DB
// });

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connection = await mysql.createConnection({
  database: process.env.MYSQL_DB,
});

export const db = drizzle(connection, {
  schema: schema,
  mode: "default", // Optional, can also be 'planetscale' depending on your DB
});
