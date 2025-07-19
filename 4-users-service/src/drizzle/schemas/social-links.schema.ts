import { SellersTable } from "@src/drizzle/schemas/sellers.schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// ** --- SocialLinks Table ---
export const SocialLinksTable = pgTable("social_links_table", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => SellersTable.id, { onDelete: "cascade" }),

  platform: text("platform").notNull(),
  link: text("link").notNull(),
});

// ** --- Relations for Drizzle ---
export const socialLinksRelations = relations(SocialLinksTable, ({ one }) => ({
  seller: one(SellersTable, {
    fields: [SocialLinksTable.sellerId],
    references: [SellersTable.id],
  }),
}));
