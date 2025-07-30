import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const AuthTable = pgTable("auths_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  profilePublicId: text("profilePublicId").notNull(),
  profilePicture: text("profilePicture").notNull(),

  // ** Optional
  country: text("country"),
  emailVerificationToken: text("emailVerificationToken"),
  emailVerified: boolean("emailVerified").notNull().default(false),
  browserName: text("browserName"),
  deviceType: text("deviceType"),
  otp: text("otp"),
  otpExpiration: timestamp("otpExpiration"),
  passwordResetToken: text("passwordResetToken"),
  passwordResetExpires: timestamp("passwordResetExpires"),
});

// export type Auth = typeof AuthTable.$inferSelect;
// export type NewAuth = typeof AuthTable.$inferInsert;
