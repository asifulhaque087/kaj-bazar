ALTER TABLE "orders_table" ALTER COLUMN "place_order_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "orders_table" ALTER COLUMN "place_order_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "orders_table" ALTER COLUMN "gig" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders_table" ALTER COLUMN "buyer" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders_table" ALTER COLUMN "seller" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders_table" ALTER COLUMN "delivery_due_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders_table" ALTER COLUMN "payment_intent" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders_table" DROP COLUMN "service_fee";