CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `showcase_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`showcase_id` int NOT NULL,
	`image_path` varchar(255) NOT NULL,
	`alt_text` varchar(255),
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `showcase_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `showcase_tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`showcase_id` int NOT NULL,
	`tag_name` varchar(100) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `showcase_tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `showcases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`banner_image` varchar(255),
	`is_published` tinyint NOT NULL DEFAULT 0,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `showcases_id` PRIMARY KEY(`id`),
	CONSTRAINT `showcases_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` varchar(100),
	`full_name` varchar(100),
	`role` enum('admin','editor') NOT NULL DEFAULT 'admin',
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `showcase_images` ADD CONSTRAINT `showcase_images_showcase_id_showcases_id_fk` FOREIGN KEY (`showcase_id`) REFERENCES `showcases`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `showcase_tags` ADD CONSTRAINT `showcase_tags_showcase_id_showcases_id_fk` FOREIGN KEY (`showcase_id`) REFERENCES `showcases`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `showcases` ADD CONSTRAINT `showcases_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE no action;