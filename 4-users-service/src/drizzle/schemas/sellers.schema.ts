import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { LanguagesTable } from "@src/drizzle/schemas/languages.schema";
import { SkillsTable } from "@src/drizzle/schemas/skills.schema";
import { ExperiencesTable } from "@src/drizzle/schemas/experiences.schema";
import { SocialLinksTable } from "@src/drizzle/schemas/social-links.schema";
import { CertificatesTable } from "@src/drizzle/schemas/certificates.schema";
import { EducationsTable } from "@src/drizzle/schemas/educations.schema";

// ** --- Seller Table ---
export const SellersTable = pgTable("sellers_table", {
  id: uuid("id").primaryKey(),
  fullName: text("full_name").notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  profilePicture: text("profile_picture"),
  description: text("description"),
  profilePublicId: varchar("profile_public_id", { length: 255 }),
  oneliner: varchar("oneliner", { length: 255 }),
  country: varchar("country", { length: 255 }),

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

  responseTime: integer("response_time").default(0),
  recentDelivery: timestamp("recent_delivery", { mode: "date" }),

  ongoingJobs: integer("ongoing_jobs").default(0),
  completedJobs: integer("completed_jobs").default(0),
  cancelledJobs: integer("cancelled_jobs").default(0),
  totalEarnings: integer("total_earnings").default(0),
  totalGigs: integer("total_gigs").default(0),

  ratingsCount: integer("ratings_count").default(0),
  ratingSum: integer("rating_sum").default(0),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ** --- Relations for Drizzle
export const sellerRelations = relations(SellersTable, ({ many }) => ({
  languages: many(LanguagesTable),
  skills: many(SkillsTable),
  experience: many(ExperiencesTable),
  education: many(EducationsTable),
  socialLinks: many(SocialLinksTable),
  certificates: many(CertificatesTable),
}));
