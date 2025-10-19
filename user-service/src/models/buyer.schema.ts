// src/db/schema/buyer.ts (or wherever you define your schemas)
import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
// import { relations } from 'drizzle-orm'; // Uncomment if you plan to define Drizzle relations
// import { gigs } from './gig'; // Assuming your Gig schema is defined in gig.ts

export const buyers = pgTable('buyers', {
  // Mongoose's `_id` is implicitly added. In PostgreSQL with Drizzle,
  // we typically use `uuid` as primary key with a default generated value.
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),

  // `username: { type: String, required: true, index: true }`
  // `index: true` for username and email usually implies a unique index.
  username: text('username').notNull().unique(),

  // `email: { type: String, required: true, index: true }`
  email: text('email').notNull().unique(),

  // `profilePicture: { type: String, required: true }`
  profilePicture: text('profile_picture').notNull(),

  // `country: { type: String, required: true }`
  country: text('country').notNull(),

  // `isSeller: { type: Boolean, default: false }`
  isSeller: boolean('is_seller').notNull().default(false),

  // `purchasedGigs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gig' }]`
  // This is an array of Mongoose ObjectIds. In PostgreSQL, a direct translation
  // would be an array of UUIDs if you convert ObjectIds to UUIDs, or text if you
  // store them as strings. We'll use UUIDs assuming new UUIDs are generated
  // or ObjectIds are converted.
  // Note: For a fully normalized relational model, you might prefer a separate
  // many-to-many join table (e.g., `buyer_gigs`).
  purchasedGigs: uuid('purchased_gigs').array().default([]),

  // `createdAt: { type: Date }`
  // In Drizzle, you'd typically set a default value to the current timestamp.
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`)
});

// --- Optional: Drizzle Relations (if you define a 'Gig' schema) ---
// If you want to define explicit relations for Drizzle's join capabilities,
// and you have a 'Gig' schema (e.g., `export const gigs = pgTable(...)`):

/*
export const buyersRelations = relations(buyers, ({ many }) => ({
  // If `purchasedGigs` is an array of IDs on the `buyers` table:
  // This doesn't create a direct Drizzle relation for querying via `with` directly,
  // as it's an array field. You would query these IDs manually or use a join table.

  // If you were to use a join table for a many-to-many relationship (recommended for normalization):
  // Example for a join table structure:
  // buyerToGigs: many(buyerGigs), // assuming buyerGigs is your join table schema
}));

// Example of a join table (if you normalize the purchasedGigs relationship):
// export const buyerGigs = pgTable('buyer_gigs', {
//   buyerId: uuid('buyer_id').notNull().references(() => buyers.id),
//   gigId: uuid('gig_id').notNull().references(() => gigs.id) // Assuming `gigs` is your Gig table schema
// });

// export const buyerGigsRelations = relations(buyerGigs, ({ one }) => ({
//   buyer: one(buyers, {
//     fields: [buyerGigs.buyerId],
//     references: [buyers.id]
//   }),
//   gig: one(gigs, {
//     fields: [buyerGigs.gigId],
//     references: [gigs.id]
//   })
// }));
*/

// For non-unique indexes, if `index: true` did *not* imply `unique`:
/*
import { index } from 'drizzle-orm/pg-core';

export const buyerIndexes = pgTable('buyers', {
  // ... your columns ...
}, (table) => {
  return {
    // Example for a non-unique index on username
    usernameIdx: index('username_idx').on(table.username),
    // Example for a non-unique index on email
    emailIdx: index('email_idx').on(table.email),
  };
});
*/