import { SellersTable } from "@src/drizzle/schemas/sellers.schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

// ** --- Educations Table ---
export const EducationsTable = pgTable("educations_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  sellerId: uuid("seller_id")
    .references(() => SellersTable.id, { onDelete: "cascade" })
    .notNull(),
  university: varchar("university", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  major: varchar("major", { length: 255 }),
  year: varchar("year", { length: 255 }),
  country: varchar("country", { length: 255 }),
});

// ** --- Relations for Drizzle ---
export const educationRelations = relations(EducationsTable, ({ one }) => ({
  seller: one(SellersTable, {
    fields: [EducationsTable.sellerId],
    references: [SellersTable.id],
  }),
}));
