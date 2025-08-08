import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// --- Review Table ---
export const ReviewsTable = pgTable("reviews_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  //  gig information
  gigId: uuid("gig_id").notNull(),
  gigImage: text("gig_image").notNull(),
  gigTitle: text("gig_image").notNull(),
  //   order information
  orderId: uuid("order_id").notNull(),
  //   buyer information
  buyerId: uuid("buyer_id").notNull(),
  //   seller information
  sellerId: uuid("seller_id").notNull(),
  //   sender information
  senderId: uuid("sender_id").notNull(),
  senderUsername: text("sender_username").notNull(),
  senderImage: text("sender_image").notNull(),
  senderCountry: text("sender_country"),
  //   receiver information
  receiverId: uuid("receiver_id").notNull(),
  // reveiw information
  ratings: integer("ratings").notNull(),
  comment: text("comment"),
  reivewGivenAt: timestamp("review_given_at").notNull().defaultNow(),
});
