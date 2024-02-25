CREATE TABLE `asset` (
	`id` varchar(12) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`category` enum('text','image','video'),
	`location` enum('s3'),
	`location_id` varchar(12),
	`created_at` date NOT NULL,
	CONSTRAINT `asset_id` PRIMARY KEY(`id`)
);

CREATE TABLE `board_asset` (
	`board_id` varchar(12) NOT NULL,
	`asset_id` varchar(12) NOT NULL,
	CONSTRAINT `board_asset_asset_id_board_id` PRIMARY KEY(`asset_id`,`board_id`)
);

CREATE TABLE `board` (
	`id` varchar(12) NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`created_at` datetime NOT NULL,
	CONSTRAINT `board_id` PRIMARY KEY(`id`)
);

CREATE TABLE `location_s3` (
	`id` varchar(12) NOT NULL,
	`key` varchar(1024) NOT NULL,
	`bucket` varchar(63) NOT NULL,
	CONSTRAINT `location_s3_id` PRIMARY KEY(`id`)
);

CREATE TABLE `user_board` (
	`clerk_user_id` varchar(32) NOT NULL,
	`board_id` varchar(12) NOT NULL,
	`role` enum('owner','edit','read'),
	CONSTRAINT `user_board_board_id_clerk_user_id` PRIMARY KEY(`board_id`,`clerk_user_id`)
);

CREATE INDEX `ix_board_asset_asset_id` ON `board_asset` (`asset_id`);