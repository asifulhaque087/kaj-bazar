import { SellersTable } from "@src/drizzle/schemas/sellers.schema";
import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// ** --- Certificates Table ---
export const CertificatesTable = pgTable("certificates_table", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id")
    .notNull()
    .references(() => SellersTable.id, { onDelete: "cascade" }),
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
