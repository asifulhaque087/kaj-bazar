CREATE TABLE "reviews_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gig_id" uuid NOT NULL,
	"gig_image" text NOT NULL,
	"order_id" uuid NOT NULL,
	"buyer_id" uuid NOT NULL,
	"seller_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"sender_username" text NOT NULL,
	"sender_image" text NOT NULL,
	"sender_country" text,
	"receiver_id" uuid NOT NULL,
	"ratings" integer NOT NULL,
	"comment" text,
	"review_given_at" timestamp DEFAULT now() NOT NULL
);
