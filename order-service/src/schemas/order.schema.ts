import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

interface ExtensionRequest {
  oldDate: string;
  newDate: string;
  reason: string | null;
  tempReason: string | null;
  accepted: boolean | null;
}

interface DeliveredWork {
  message?: string;
  file: string;
}

interface Review {
  rating: number;
  review: string | null;
  receivedAt: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  country?: string | null | undefined;
}

interface Gig {
  id: string;
  title: string;
  basicTitle: string;
  description: string;
  basicDescription: string;
  coverImage: string;
}

// interface Seller {
//   rating: number;
//   review: string;
//   receivedAt: string;
// }

export const OrderStatus = pgEnum("oder_status", [
  "incomplete",
  "progress",
  "complete",
]);

// --- Order Table ---
export const OrdersTable = pgTable("orders_table", {
  id: uuid("id").primaryKey().defaultRandom(),
  messageId: uuid("message_id").notNull(),
  paymentIntent: text("payment_intent").notNull(),
  price: integer("price").notNull(),
  // serviceFee: integer("service_fee").notNull(),
  gig: jsonb("gig").$type<Gig>().notNull(),
  // buyer: jsonb("buyer").$type<Buyer>(),
  // seller: jsonb("seller").$type<Seller>(),
  buyer: jsonb("buyer").$type<User>().notNull(),
  seller: jsonb("seller").$type<User>().notNull(),
  deliveryDueDate: timestamp("delivery_due_date").notNull(),

  // ** Optional

  deliveryInDays: integer("delivery_in_days"),
  orderStatus: OrderStatus("order_status").default("incomplete").notNull(),
  placeOrderAt: timestamp("place_order_at").notNull().defaultNow(),
  // requirement
  requirement: text("requirement"),
  requirementAt: timestamp("requirement_at"),

  orderStartedAt: timestamp("order_started_at"),
  requestExtensions: jsonb("request_extensions").$type<ExtensionRequest[]>(),

  // delivery
  deliveredWorks: jsonb("delivered_works").$type<DeliveredWork[]>(),
  orderDeliveredAt: timestamp("oder_delivered_at"),
  // review
  sellerReceivedReview: jsonb("seller_received_review").$type<Review>(),
  buyerReceivedReview: jsonb("buyer_received_review").$type<Review>(),

  accepted: boolean("accepted"),
  acceptedAt: timestamp("accepted_at"),
});

// --- Relationships ---
