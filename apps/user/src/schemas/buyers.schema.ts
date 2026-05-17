import {
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const BuyersTable = pgTable("buyers_table", {
  id: uuid("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  profilePublicId: text("profilePublicId").notNull(),
  profilePicture: text("profile_picture").notNull(),
  // ** optional
  country: text("country"),
  isSeller: boolean("is_seller").notNull().default(false),
  // purchasedGigs: uuid("purchased_gigs").array().default([]),

  ratingCategories: jsonb("rating_categories")
    .$type<{
      five: { value: number; count: number };
      four: { value: number; count: number };
      three: { value: number; count: number };
      two: { value: number; count: number };
      one: { value: number; count: number };
    }>()
    .default({
      five: { value: 0, count: 0 },
      four: { value: 0, count: 0 },
      three: { value: 0, count: 0 },
      two: { value: 0, count: 0 },
      one: { value: 0, count: 0 },
    })
    .notNull(),

  ratingsCount: integer("ratings_count").default(0),
  ratingSum: integer("rating_sum").default(0),

  ongoingJobs: integer("ongoing_jobs").default(0),
  completedJobs: integer("completed_jobs").default(0),
  cancelledJobs: integer("cancelled_jobs").default(0),
  totalEarnings: integer("total_earnings").default(0),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
