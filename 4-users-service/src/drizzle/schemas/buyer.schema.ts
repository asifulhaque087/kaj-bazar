import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

export const BuyersTable = pgTable("buyers", {
  id: serial().primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  profilePicture: text("profile_picture").notNull(),
  country: text("country").notNull(),
  isSeller: boolean("is_seller").notNull().default(false),
  purchasedGigs: uuid("purchased_gigs").array().default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
