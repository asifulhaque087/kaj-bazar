import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const GigsTable = pgTable("gigs_table", {
  id: serial("id").primaryKey(), // Auto-incrementing primary key
  sellerId: integer("seller_id").notNull(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  profilePicture: text("profile_picture"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  basicTitle: text("basic_title").notNull(),
  basicDescription: text("basic_description").notNull(),
  category: text("category").notNull(),
  subCategories: text("sub_categories").array().notNull(),
  tags: text("tags").array(),
  active: boolean("active").notNull().default(true),
  expectedDelivery: text("expected_delivery").notNull(),
  ratingsCount: integer("ratings_count").notNull().default(0),
  ratingSum: integer("rating_sum").notNull().default(0),
  ratingCategories: jsonb("rating_categories")
    .$type<{
      five: { star: number; count: number };
      four: { star: number; count: number };
      three: { star: number; count: number };
      two: { star: number; count: number };
      one: { star: number; count: number };
    }>()
    .default({
      five: { star: 0, count: 0 },
      four: { star: 0, count: 0 },
      three: { star: 0, count: 0 },
      two: { star: 0, count: 0 },
      one: { star: 0, count: 0 },
    })
    .notNull(),
  price: integer("price").notNull().default(0),
  sortId: integer("sort_id"),
  coverImage: text("cover_image").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Infer types for easier usage
// export type Gig = InferSelectModel<typeof gigs>;
// export type NewGig = InferInsertModel<typeof gigs>;
