CREATE TYPE "public"."oder_status" AS ENUM('incomplete', 'progress', 'complete');--> statement-breakpoint
CREATE TABLE "orders_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message_id" uuid NOT NULL,
	"payment_intent" text NOT NULL,
	"price" integer NOT NULL,
	"gig" jsonb NOT NULL,
	"buyer" jsonb NOT NULL,
	"seller" jsonb NOT NULL,
	"delivery_due_date" timestamp NOT NULL,
	"delivery_in_days" integer,
	"order_status" "oder_status" DEFAULT 'incomplete' NOT NULL,
	"place_order_at" timestamp DEFAULT now() NOT NULL,
	"requirement" text,
	"requirement_at" timestamp,
	"order_started_at" timestamp,
	"request_extensions" jsonb,
	"delivered_works" jsonb,
	"oder_delivered_at" timestamp,
	"seller_received_review" jsonb,
	"buyer_received_review" jsonb,
	"accepted" boolean,
	"accepted_at" timestamp
);
