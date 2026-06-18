/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
DROP INDEX IF EXISTS `sessions_session_token_unique`;--> statement-breakpoint
ALTER TABLE `sessions` ADD `sessionToken` text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ADD `userId` text NOT NULL REFERENCES users(id);--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerified` integer;--> statement-breakpoint
ALTER TABLE `users` ADD `image` text;--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `createdAt` integer DEFAULT (unixepoch()) NOT NULL;--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `session_token`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `password_hash`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `created_at`;