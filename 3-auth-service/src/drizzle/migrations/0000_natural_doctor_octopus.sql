CREATE TABLE `auths_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`profilePublicId` text NOT NULL,
	`email` text NOT NULL,
	`country` text NOT NULL,
	`profilePicture` text NOT NULL,
	`emailVerificationToken` text,
	`emailVerified` boolean NOT NULL DEFAULT false,
	`browserName` text NOT NULL,
	`deviceType` text NOT NULL,
	`otp` text,
	`otpExpiration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`passwordResetToken` text,
	`passwordResetExpires` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `auths_table_id` PRIMARY KEY(`id`)
);
