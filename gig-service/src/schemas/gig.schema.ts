import {
  pgTable,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";

interface SubCategory {
  title: string;
}

interface Tag {
  title: string;
}

export const GigsTable = pgTable("gigs_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  sellerId: uuid("seller_id").notNull(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  profilePicture: text("profile_picture").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  basicTitle: text("basic_title").notNull(),
  basicDescription: text("basic_description").notNull(),
  // revisionCount: text("revision_count"),
  // isSourceFile: boolean("is_source_file"),
  category: text("category").notNull(),
  // subCategories: text("sub_categories").array().notNull(),
  subCategories: jsonb("sub_categories").$type<SubCategory[]>().notNull(),
  expectedDelivery: text("expected_delivery").notNull(),
  coverImage: text("cover_image").notNull(),
  price: integer("price").notNull(),
  // ** Optional
  // tags: text("tags").array(),
  tags: jsonb("tags").$type<Tag[]>(),
  active: boolean("active").notNull().default(true),
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
    .notNull()
    .default({
      five: { star: 0, count: 0 },
      four: { star: 0, count: 0 },
      three: { star: 0, count: 0 },
      two: { star: 0, count: 0 },
      one: { star: 0, count: 0 },
    }),
  sortId: integer("sort_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Infer types for easier usage
// export type Gig = InferSelectModel<typeof gigs>;
// export type NewGig = InferInsertModel<typeof gigs>;
