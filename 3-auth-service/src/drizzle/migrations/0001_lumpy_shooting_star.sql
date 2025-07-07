ALTER TABLE `auths_table` MODIFY COLUMN `browserName` text;--> statement-breakpoint
ALTER TABLE `auths_table` MODIFY COLUMN `deviceType` text;--> statement-breakpoint
ALTER TABLE `auths_table` MODIFY COLUMN `otpExpiration` datetime;--> statement-breakpoint
ALTER TABLE `auths_table` MODIFY COLUMN `createdAt` datetime;--> statement-breakpoint
ALTER TABLE `auths_table` MODIFY COLUMN `passwordResetExpires` datetime;