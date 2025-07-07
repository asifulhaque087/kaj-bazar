ALTER TABLE `auths_table` MODIFY COLUMN `otpExpiration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `auths_table` MODIFY COLUMN `createdAt` datetime DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `auths_table` MODIFY COLUMN `passwordResetExpires` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;