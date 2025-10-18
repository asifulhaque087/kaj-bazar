import { SellersTable } from "@src/schemas/sellers.schema";
import { relations } from "drizzle-orm";
import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

// ** --- SocialLinks Table ---
export const SocialLinksTable = pgTable("social_links_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  sellerId: uuid("seller_id")
    .references(() => SellersTable.id, { onDelete: "cascade" })
    .notNull(),
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
