// src/db/schema/seller.ts (or wherever you define your schemas)
import { pgTable, uuid, text, boolean, integer, real, timestamp, jsonb, serial } from 'drizzle-orm/pg-core';

export const SellersTable= pgTable('sellers', {

  id: serial().primaryKey(),

  fullName: text('full_name').notNull(),

  username: text('username').notNull().unique(),

  email: text('email').notNull().unique(),

  profilePicture: text('profile_picture').notNull(),

  description: text('description').notNull(),

  profilePublicId: text('profile_public_id').notNull(),

  // `oneliner: { type: String, default: '' }`
  oneliner: text('oneliner').default(''),

  country: text('country').notNull(),

  // `languages: [{ language: String, level: String }]`
  // Stored as a JSONB array of objects.
  languages: jsonb('languages').default([]).$type<{ language: string; level: string; }[]>(),

  // `skills: [{ type: String, required: true }]`
  // Stored as a PostgreSQL text array.
  skills: text('skills').array().default([]),

  // `ratingsCount: { type: Number, default: 0 }`
  ratingsCount: integer('ratings_count').default(0),

  // `ratingSum: { type: Number, default: 0 }`
  ratingSum: integer('rating_sum').default(0),

  // `ratingCategories: { five: { value: Number, count: Number }, ... }`
  // Stored as a JSONB object.
  ratingCategories: jsonb('rating_categories').default({
    five: { value: 0, count: 0 },
    four: { value: 0, count: 0 },
    three: { value: 0, count: 0 },
    two: { value: 0, count: 0 },
    one: { value: 0, count: 0 },
  }).$type<{
    five: { value: number; count: number };
    four: { value: number; count: number };
    three: { value: number; count: number };
    two: { value: number; count: number };
    one: { value: number; count: number };
  }>(),

  // `responseTime: { type: Number, default: 0 }`
  responseTime: integer('response_time').default(0),

  // `recentDelivery: { type: Date, default: '' }`
  // Mongoose's `default: ''` for Date is unusual. In PostgreSQL, a timestamp
  // column should hold a date or NULL. If it means "no value", `null` is appropriate.
  recentDelivery: timestamp('recent_delivery', { withTimezone: true }), // Allow null by default if no .notNull() or .default()

  // `experience: [{ company: String, title: String, ... }]`
  // Stored as a JSONB array of objects.
  experience: jsonb('experience').default([]).$type<{
    company: string;
    title: string;
    startDate: string; // Assuming these are dates as strings
    endDate: string;
    description: string;
    currentlyWorkingHere: boolean;
  }[]>(),

  // `education: [{ country: String, university: String, ... }]`
  // Stored as a JSONB array of objects.
  education: jsonb('education').default([]).$type<{
    country: string;
    university: string;
    title: string;
    major: string;
    year: string; // Assuming year is stored as string
  }>(),

  // `socialLinks: [{ type: String, default: '' }]`
  // Stored as a PostgreSQL text array.
  socialLinks: text('social_links').array().default([]),

  // `certificates: [{ name: String, from: String, year: Number }]`
  // Stored as a JSONB array of objects.
  certificates: jsonb('certificates').default([]).$type<{
    name: string;
    from: string;
    year: number;
  }[]>(),

  // `ongoingJobs: { type: Number, default: 0 }`
  ongoingJobs: integer('ongoing_jobs').default(0),

  // `completedJobs: { type: Number, default: 0 }`
  completedJobs: integer('completed_jobs').default(0),

  // `cancelledJobs: { type: Number, default: 0 }`
  cancelledJobs: integer('cancelled_jobs').default(0),

  // `totalEarnings: { type: Number, default: 0 }`
  // Using `real` for potential decimal earnings.
  totalEarnings: real('total_earnings').default(0),

  // `totalGigs: { type: Number, default: 0 }`
  totalGigs: integer('total_gigs').default(0),

  // `createdAt: { type: Date, default: Date.now }`
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});