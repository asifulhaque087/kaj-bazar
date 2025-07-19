CREATE TABLE "buyers_table" (
	"id" integer PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"profilePublicId" text NOT NULL,
	"profile_picture" text,
	"country" text,
	"is_seller" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "buyers_table_username_unique" UNIQUE("username"),
	CONSTRAINT "buyers_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "buyers" CASCADE;