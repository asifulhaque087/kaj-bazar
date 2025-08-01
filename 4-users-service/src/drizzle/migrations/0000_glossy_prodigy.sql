CREATE TABLE "buyers_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"profilePublicId" text NOT NULL,
	"profile_picture" text NOT NULL,
	"country" text,
	"is_seller" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "buyers_table_username_unique" UNIQUE("username"),
	CONSTRAINT "buyers_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "certificates_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"from" varchar(255),
	"year" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "educations_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" uuid NOT NULL,
	"university" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"major" varchar(255),
	"year" varchar(255),
	"country" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "experiences_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" uuid NOT NULL,
	"company" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"start_date" varchar(255),
	"end_date" varchar(255),
	"description" text,
	"currently_working_here" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "languages_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" uuid NOT NULL,
	"language" varchar(255) NOT NULL,
	"level" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sellers_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"profile_picture" text,
	"description" text,
	"profile_public_id" varchar(255),
	"oneliner" varchar(255),
	"country" varchar(255),
	"rating_categories" jsonb DEFAULT '{"five":{"value":0,"count":0},"four":{"value":0,"count":0},"three":{"value":0,"count":0},"two":{"value":0,"count":0},"one":{"value":0,"count":0}}'::jsonb NOT NULL,
	"response_time" integer DEFAULT 0,
	"recent_delivery" timestamp,
	"ongoing_jobs" integer DEFAULT 0,
	"completed_jobs" integer DEFAULT 0,
	"cancelled_jobs" integer DEFAULT 0,
	"total_earnings" integer DEFAULT 0,
	"total_gigs" integer DEFAULT 0,
	"ratings_count" integer DEFAULT 0,
	"rating_sum" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sellers_table_username_unique" UNIQUE("username"),
	CONSTRAINT "sellers_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "skills_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_links_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" uuid NOT NULL,
	"platform" text NOT NULL,
	"link" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "certificates_table" ADD CONSTRAINT "certificates_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "educations_table" ADD CONSTRAINT "educations_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiences_table" ADD CONSTRAINT "experiences_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "languages_table" ADD CONSTRAINT "languages_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills_table" ADD CONSTRAINT "skills_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_links_table" ADD CONSTRAINT "social_links_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;