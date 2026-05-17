import { SellersTable } from "@src/schemas/sellers.schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

// ** --- Skills Table ---
export const SkillsTable = pgTable("skills_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  sellerId: uuid("seller_id")
    .references(() => SellersTable.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

// ** --- Relations for Drizzle ---
export const skillsRelations = relations(SkillsTable, ({ one }) => ({
  seller: one(SellersTable, {
    fields: [SkillsTable.sellerId],
    references: [SellersTable.id],
  }),
}));
