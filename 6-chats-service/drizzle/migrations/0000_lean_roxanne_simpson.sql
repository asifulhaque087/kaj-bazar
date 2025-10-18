CREATE TABLE "conversations_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sender_username" text NOT NULL,
	"receiver_username" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"sender_username" text NOT NULL,
	"receiver_username" text NOT NULL,
	"sender_picture" text NOT NULL,
	"receiver_picture" text NOT NULL,
	"buyer_id" uuid NOT NULL,
	"seller_id" uuid NOT NULL,
	"body" text DEFAULT '',
	"file" text DEFAULT '',
	"file_type" text DEFAULT '',
	"file_size" text DEFAULT '',
	"file_name" text DEFAULT '',
	"is_read" boolean DEFAULT false,
	"has_offer" boolean DEFAULT false,
	"offer" jsonb DEFAULT '{"gigTitle":"","gigId":"","price":0,"description":"","deliveryInDays":0,"oldDeliveryDate":"","newDeliveryDate":"","accepted":false,"cancelled":false}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "messages_table" ADD CONSTRAINT "messages_table_conversation_id_conversations_table_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations_table"("id") ON DELETE cascade ON UPDATE no action;