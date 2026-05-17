import { SellersTable } from "@src/schemas/sellers.schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

// ** --- Languages Table ---
export const LanguagesTable = pgTable("languages_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  sellerId: uuid("seller_id")
    .references(() => SellersTable.id, { onDelete: "cascade" })
    .notNull(),
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
