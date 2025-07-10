ALTER TABLE `auths_table` MODIFY COLUMN `otpExpiration` datetime;--> statement-breakpoint
ALTER TABLE `auths_table` MODIFY COLUMN `createdAt` datetime;--> statement-breakpoint
ALTER TABLE `auths_table` MODIFY COLUMN `passwordResetExpires` datetime;