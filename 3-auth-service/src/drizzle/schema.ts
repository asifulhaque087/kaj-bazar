import {
  mysqlTable,
  boolean,
  datetime,
  serial,
  text,
  mediumtext,
} from "drizzle-orm/mysql-core";

export const AuthTable = mysqlTable("auths_table", {
  id: serial().primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  profilePublicId: text("profilePublicId").notNull(),
  profilePicture: mediumtext("profilePicture"),
  country: text("country"),
  emailVerificationToken: text("emailVerificationToken"),
  emailVerified: boolean("emailVerified").notNull().default(false),
  browserName: text("browserName"),
  deviceType: text("deviceType"),
  otp: text("otp"),
  otpExpiration: datetime("otpExpiration"),
  passwordResetToken: text("passwordResetToken"),
  passwordResetExpires: datetime("passwordResetExpires"),
});
