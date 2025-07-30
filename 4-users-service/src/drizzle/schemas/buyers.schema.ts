import { pgTable, text, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

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
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
