import {
  mysqlTable,
  varchar,
  boolean,
  datetime,
  index,
  serial,
} from "drizzle-orm/mysql-core";
import { type InferInsertModel, type InferSelectModel } from "drizzle-orm"; // Updated import
import { sql } from "drizzle-orm"; // Import sql for defaultNow()
import { hash, compare } from "bcryptjs";

const SALT_ROUND = 10;

export const usersTable = mysqlTable("users_table", {
  id: serial().primaryKey(),
  // name: varchar({ length: 255 }).notNull(),
  // age: int().notNull(),
  // email: varchar({ length: 255 }).notNull().unique(),
});

export const authsTable = mysqlTable(
  "auths_table",
  {
    // id: serial().primaryKey(),
    username: varchar("username", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    profilePublicId: varchar("profilePublicId", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    country: varchar("country", { length: 255 }).notNull(),
    profilePicture: varchar("profilePicture", { length: 255 }).notNull(),
    emailVerificationToken: varchar("emailVerificationToken", { length: 255 }),
    emailVerified: boolean("emailVerified").notNull().default(false),
    browserName: varchar("browserName", { length: 255 }).notNull(),
    deviceType: varchar("deviceType", { length: 255 }).notNull(),
    otp: varchar("otp", { length: 10 }),
    otpExpiration: datetime("otpExpiration")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`), // Changed to sql`CURRENT_TIMESTAMP`
    createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`), // Changed to sql`CURRENT_TIMESTAMP`
    passwordResetToken: varchar("passwordResetToken", { length: 255 }),
    passwordResetExpires: datetime("passwordResetExpires")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`), // Changed to sql`CURRENT_TIMESTAMP`

    // Indexes
  },

  (auths) => [
    index("email_idx").on(auths.email),
    index("username_idx").on(auths.username),
    index("email_verification_idx").on(auths.emailVerificationToken),
  ]
);

// Types
export type Auth = InferSelectModel<typeof authsTable>; // Updated type
export type NewAuth = InferInsertModel<typeof authsTable>; // Updated type
