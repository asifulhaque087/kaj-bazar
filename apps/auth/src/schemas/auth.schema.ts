import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const AuthTable = pgTable('auths_table', {
  id: uuid('id').primaryKey().defaultRandom(),

  //   ** raw
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),

  // ** Optional
  profilePicture: text('profilePicture'),
  profilePublicId: text('profilePublicId'),
  password: text('password'),
  refreshToken: text('refreshToken'),
  country: text('country'),
  emailVerificationToken: text('emailVerificationToken'),
  emailVerified: boolean('emailVerified').notNull().default(false),
  provider: text('provider').notNull().default('local'),
  browserName: text('browserName'),
  deviceType: text('deviceType'),
  otp: text('otp'),
  otpExpiration: timestamp('otpExpiration'),
  passwordResetToken: text('passwordResetToken'),
  passwordResetExpires: timestamp('passwordResetExpires'),
});

// export type Auth = typeof AuthTable.$inferSelect;
// export type NewAuth = typeof AuthTable.$inferInsert;
