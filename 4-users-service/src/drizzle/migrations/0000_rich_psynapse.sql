CREATE TABLE "buyers" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"profile_picture" text NOT NULL,
	"country" text NOT NULL,
	"is_seller" boolean DEFAULT false NOT NULL,
	"purchased_gigs" uuid[] DEFAULT '{}',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "buyers_username_unique" UNIQUE("username"),
	CONSTRAINT "buyers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "certificates_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"seller_id" integer NOT NULL,
	"name" varchar(255),
	"from" varchar(255),
	"year" integer
);
--> statement-breakpoint
CREATE TABLE "educations_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"seller_id" integer NOT NULL,
	"country" varchar(255) DEFAULT '',
	"university" varchar(255) DEFAULT '',
	"title" varchar(255) DEFAULT '',
	"major" varchar(255) DEFAULT '',
	"year" varchar(255) DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE "experiences_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"seller_id" integer NOT NULL,
	"company" varchar(255) DEFAULT '',
	"title" varchar(255) DEFAULT '',
	"start_date" varchar(255) DEFAULT '',
	"end_date" varchar(255) DEFAULT '',
	"description" text DEFAULT '',
	"currently_working_here" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "sellers_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"profile_picture" text,
	"description" text,
	"profile_public_id" varchar(255),
	"oneliner" varchar(255) DEFAULT '',
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
CREATE TABLE "languages_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"seller_id" integer NOT NULL,
	"language" varchar(255) NOT NULL,
	"level" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"seller_id" integer NOT NULL,
	"skill" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_links_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"seller_id" integer NOT NULL,
	"link" text DEFAULT ''
);
--> statement-breakpoint
ALTER TABLE "certificates_table" ADD CONSTRAINT "certificates_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "educations_table" ADD CONSTRAINT "educations_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiences_table" ADD CONSTRAINT "experiences_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "languages_table" ADD CONSTRAINT "languages_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills_table" ADD CONSTRAINT "skills_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_links_table" ADD CONSTRAINT "social_links_table_seller_id_sellers_table_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."sellers_table"("id") ON DELETE cascade ON UPDATE no action;