CREATE TABLE `auths_table` (
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`profilePublicId` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`country` varchar(255) NOT NULL,
	`profilePicture` varchar(255) NOT NULL,
	`emailVerificationToken` varchar(255),
	`emailVerified` boolean NOT NULL DEFAULT false,
	`browserName` varchar(255) NOT NULL,
	`deviceType` varchar(255) NOT NULL,
	`otp` varchar(10),
	`otpExpiration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	`passwordResetToken` varchar(255),
	`passwordResetExpires` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `email_idx` ON `auths_table` (`email`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `auths_table` (`username`);--> statement-breakpoint
CREATE INDEX `email_verification_idx` ON `auths_table` (`emailVerificationToken`);