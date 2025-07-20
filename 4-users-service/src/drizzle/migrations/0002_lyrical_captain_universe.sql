ALTER TABLE "certificates_table" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "certificates_table" ALTER COLUMN "year" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "educations_table" ALTER COLUMN "country" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "educations_table" ALTER COLUMN "university" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "educations_table" ALTER COLUMN "university" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "educations_table" ALTER COLUMN "title" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "educations_table" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "educations_table" ALTER COLUMN "major" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "educations_table" ALTER COLUMN "year" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "experiences_table" ALTER COLUMN "company" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "experiences_table" ALTER COLUMN "company" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences_table" ALTER COLUMN "title" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "experiences_table" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences_table" ALTER COLUMN "start_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "experiences_table" ALTER COLUMN "end_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "experiences_table" ALTER COLUMN "description" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sellers_table" ALTER COLUMN "oneliner" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "social_links_table" ALTER COLUMN "link" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "social_links_table" ALTER COLUMN "link" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "social_links_table" ADD COLUMN "platform" text NOT NULL;