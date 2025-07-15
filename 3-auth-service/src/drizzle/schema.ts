// import { type InferInsertModel, type InferSelectModel } from "drizzle-orm"; // Updated import

// import { sql } from "drizzle-orm"; // Import sql for defaultNow()
import {
  mysqlTable,
  boolean,
  datetime,
  // index,
  serial,
  text,
  mediumtext,
} from "drizzle-orm/mysql-core";

// import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const AuthTable = mysqlTable(
  "auths_table",
  {
    id: serial().primaryKey(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    profilePublicId: text("profilePublicId").notNull(),
    email: text("email").notNull(),
    country: text("country").notNull(),
    profilePicture: mediumtext("profilePicture").notNull(),
    emailVerificationToken: text("emailVerificationToken"),
    emailVerified: boolean("emailVerified").notNull().default(false),
    browserName: text("browserName"),
    deviceType: text("deviceType"),
    otp: text("otp"),
    otpExpiration: datetime("otpExpiration"),
    createdAt: datetime("createdAt"), // Changed to sql`CURRENT_TIMESTAMP`
    passwordResetToken: text("passwordResetToken"),
    passwordResetExpires: datetime("passwordResetExpires"),

    // Indexes
  }

  // (auths) => [
  //   index("email_idx").on(auths.email),
  //   index("username_idx").on(auths.username),
  //   index("email_verification_idx").on(auths.emailVerificationToken),
  // ]
);

// Types
// export type Auth = InferSelectModel<typeof authsTable>; // Updated type
// export type NewAuth = InferInsertModel<typeof authsTable>; // Updated type

// export const insertAuthSchema = createInsertSchema(AuthTable, {
//   username: (schema) =>
//     schema
//       .min(4, { message: "Username must be at least 4 characters" })
//       .max(12, { message: "Username cannot exceed 12 characters" }),

//   password: (schema) =>
//     schema
//       .min(4, { message: "Password must be at least 4 characters" })
//       .max(12, { message: "Password cannot exceed 12 characters" }),

//   country: (schema) =>
//     schema.min(1, { message: "Country is a required field" }),

//   email: (schema) =>
//     schema
//       .min(1, { message: "Email is a required field" })
//       // .regex(/\S+@\S+\.\S+/, { message: "Invalid email" }),
//       .email(),

//   profilePicture: (schema) =>
//     schema.min(1, { message: "Profile picture is required" }).max(5000000, {
//       message: "Profile picture data is too large for initial processing.",
//     }),
// });

// export const selectAuthSchema = createSelectSchema(AuthTable);
