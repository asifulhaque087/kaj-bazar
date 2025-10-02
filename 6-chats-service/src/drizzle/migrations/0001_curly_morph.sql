ALTER TABLE "conversations_table" ADD COLUMN "sender_profile_photo" text NOT NULL;--> statement-breakpoint
ALTER TABLE "conversations_table" ADD COLUMN "receiver_profile_photo" text NOT NULL;--> statement-breakpoint
ALTER TABLE "messages_table" DROP COLUMN "buyer_id";--> statement-breakpoint
ALTER TABLE "messages_table" DROP COLUMN "seller_id";