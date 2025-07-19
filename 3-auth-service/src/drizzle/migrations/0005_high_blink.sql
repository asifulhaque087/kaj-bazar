ALTER TABLE `auths_table` MODIFY COLUMN `country` text;--> statement-breakpoint
ALTER TABLE `auths_table` MODIFY COLUMN `profilePicture` mediumtext;--> statement-breakpoint
ALTER TABLE `auths_table` DROP COLUMN `createdAt`;