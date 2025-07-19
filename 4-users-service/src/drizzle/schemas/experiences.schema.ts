import { SellersTable } from "@src/drizzle/schemas/sellers.schema";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

// ** --- Experiences Table ---
export const ExperiencesTable = pgTable("experiences_table", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => SellersTable.id, { onDelete: "cascade" }),
  company: varchar("company", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  startDate: varchar("start_date", { length: 255 }),
  endDate: varchar("end_date", { length: 255 }),
  description: text("description"),
  currentlyWorkingHere: boolean("currently_working_here").default(false),
});

// ** --- Relations for Drizzle ---
export const experienceRelations = relations(ExperiencesTable, ({ one }) => ({
  seller: one(SellersTable, {
    fields: [ExperiencesTable.sellerId],
    references: [SellersTable.id],
  }),
}));
