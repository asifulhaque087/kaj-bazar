CREATE TABLE "auths_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"profilePublicId" text NOT NULL,
	"profilePicture" text NOT NULL,
	"country" text,
	"emailVerificationToken" text,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"browserName" text,
	"deviceType" text,
	"otp" text,
	"otpExpiration" timestamp,
	"passwordResetToken" text,
	"passwordResetExpires" timestamp
);
