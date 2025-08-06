CREATE TYPE "public"."oder_status" AS ENUM('incomplete', 'progress', 'complete');--> statement-breakpoint
CREATE TABLE "orders_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message_id" uuid NOT NULL,
	"place_order_at" timestamp with time zone NOT NULL,
	"requirement" text,
	"requirement_at" timestamp,
	"order_started_at" timestamp,
	"gig" jsonb,
	"buyer" jsonb,
	"seller" jsonb,
	"request_extensions" jsonb,
	"delivery_due_date" timestamp,
	"delivered_works" jsonb,
	"oder_delivered_at" timestamp,
	"seller_received_review" jsonb,
	"buyer_received_review" jsonb,
	"accepted" boolean,
	"accepted_at" timestamp,
	"order_status" "oder_status" DEFAULT 'incomplete' NOT NULL,
	"payment_intent" text,
	"price" integer NOT NULL,
	"service_fee" integer NOT NULL
);
