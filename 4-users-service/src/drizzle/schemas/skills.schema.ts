import { SellersTable } from "@src/drizzle/schemas/sellers.schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// ** --- Skills Table ---
export const SkillsTable = pgTable("skills_table", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => SellersTable.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
});

// ** --- Relations for Drizzle ---
export const skillsRelations = relations(SkillsTable, ({ one }) => ({
  seller: one(SellersTable, {
    fields: [SkillsTable.sellerId],
    references: [SellersTable.id],
  }),
}));
