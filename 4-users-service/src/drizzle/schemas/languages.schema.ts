import { SellersTable } from "@src/drizzle/schemas/sellers.schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// ** --- Languages Table ---
export const LanguagesTable = pgTable("languages_table", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => SellersTable.id, { onDelete: "cascade" }),
  language: varchar("language", { length: 255 }).notNull(),
  level: varchar("level", { length: 255 }).notNull(),
});

// ** --- Relations for Drizzle ---
export const languagesRelations = relations(LanguagesTable, ({ one }) => ({
  seller: one(SellersTable, {
    fields: [LanguagesTable.sellerId],
    references: [SellersTable.id],
  }),
}));
