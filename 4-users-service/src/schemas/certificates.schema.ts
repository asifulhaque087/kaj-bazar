import { SellersTable } from "@src/schemas/sellers.schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

// ** --- Certificates Table ---
export const CertificatesTable = pgTable("certificates_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  sellerId: uuid("seller_id")
    .references(() => SellersTable.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  from: varchar("from", { length: 255 }),
  year: varchar("year", { length: 255 }),
});

// ** --- Relations for Drizzle ---
export const certificatesRelations = relations(
  CertificatesTable,
  ({ one }) => ({
    seller: one(SellersTable, {
      fields: [CertificatesTable.sellerId],
      references: [SellersTable.id],
    }),
  })
);
