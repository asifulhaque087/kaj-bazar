ALTER TABLE "buyers_table" ADD COLUMN "rating_categories" jsonb DEFAULT '{"five":{"value":0,"count":0},"four":{"value":0,"count":0},"three":{"value":0,"count":0},"two":{"value":0,"count":0},"one":{"value":0,"count":0}}'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "buyers_table" ADD COLUMN "ratings_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "buyers_table" ADD COLUMN "rating_sum" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "buyers_table" ADD COLUMN "ongoing_jobs" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "buyers_table" ADD COLUMN "completed_jobs" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "buyers_table" ADD COLUMN "cancelled_jobs" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "buyers_table" ADD COLUMN "total_earnings" integer DEFAULT 0;