-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 01, 2025 at 12:08 AM
-- Server version: 10.11.14-MariaDB-0+deb12u2-log
-- PHP Version: 8.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ziigzag_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categories_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categories_id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Web Development', 'web-development', 'Website and web application projects', '2025-09-11 16:37:49', '2025-09-11 16:37:49'),
(2, 'Mobile Apps', 'mobile-apps', 'Mobile application development projects', '2025-09-11 16:37:49', '2025-09-11 16:37:49'),
(3, 'Design', 'design', 'Graphic design and UI/UX projects', '2025-09-11 16:37:49', '2025-09-11 16:37:49'),
(4, 'E-commerce', 'e-commerce', 'Online store and e-commerce solutions', '2025-09-11 16:37:49', '2025-09-11 16:37:49');

-- --------------------------------------------------------

--
-- Table structure for table `showcases`
--

CREATE TABLE `showcases` (
  `showcases_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `showcases`
--

INSERT INTO `showcases` (`showcases_id`, `category_id`, `title`, `slug`, `description`, `banner_image`, `is_published`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'erfe', 'erfe', '<table style=\"border-collapse: collapse; width: 100%; height: 58.7814px; border-width: 1px; border-color: rgb(224, 62, 45);\" border=\"1\"><colgroup><col style=\"width: 50%;\"><col style=\"width: 25%;\"><col style=\"width: 25%;\"></colgroup>\r\n<tbody>\r\n<tr>\r\n<td style=\"border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n<td style=\"border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n<td style=\"border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n</tr>\r\n<tr>\r\n<td style=\"border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n<td style=\"border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n<td style=\"border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n</tr>\r\n<tr>\r\n<td style=\"border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n<td style=\"border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n<td style=\"border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n</tr>\r\n<tr style=\"height: 19.5938px;\">\r\n<td style=\"height: 19.5938px; border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n<td style=\"border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n<td style=\"height: 19.5938px; border-color: rgb(224, 62, 45);\">&nbsp;</td>\r\n</tr>\r\n</tbody>\r\n</table>', 'uploads/showcase/banners/68c2fb120b081_banner.png', 1, 'active', '2025-09-11 16:38:43', '2025-11-07 14:46:18'),
(2, 4, 'ferfer', 'ferfer', '<p>referfregsrgsrtgtsgrs</p>\r\n<p>grt</p>\r\n<p>sgsg</p>', 'uploads/showcase/banners/690e06828391f_banner.jpg', 1, 'active', '2025-11-07 14:47:03', '2025-11-07 14:48:16');

-- --------------------------------------------------------

--
-- Table structure for table `showcase_images`
--

CREATE TABLE `showcase_images` (
  `showcase_images_id` int(11) NOT NULL,
  `showcase_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `showcase_images`
--

INSERT INTO `showcase_images` (`showcase_images_id`, `showcase_id`, `image_path`, `alt_text`, `sort_order`, `created_at`) VALUES
(1, 1, 'uploads/showcase/images/68c2fb121c57d_0.png', NULL, 0, '2025-09-11 16:38:43'),
(5, 2, 'uploads/showcase/images/690e06b0e47c5_0.jpg', NULL, 0, '2025-11-07 14:48:16'),
(6, 2, 'uploads/showcase/images/690e06b0e4e0a_1.jpg', NULL, 1, '2025-11-07 14:48:16');

-- --------------------------------------------------------

--
-- Table structure for table `showcase_tags`
--

CREATE TABLE `showcase_tags` (
  `showcase_tags_id` int(11) NOT NULL,
  `showcase_id` int(11) NOT NULL,
  `tag_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `showcase_tags`
--

INSERT INTO `showcase_tags` (`showcase_tags_id`, `showcase_id`, `tag_name`, `created_at`) VALUES
(10, 1, 'ferf', '2025-11-07 14:46:18'),
(11, 1, 'feer', '2025-11-07 14:46:18'),
(15, 2, '45', '2025-11-07 14:48:16'),
(16, 2, '5', '2025-11-07 14:48:16'),
(17, 2, '345353', '2025-11-07 14:48:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `role` enum('admin','editor') NOT NULL DEFAULT 'admin',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `full_name`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$.8YPL6rf8Z0Yz9ZLvyw45OQ8Og/cgc7T/L4116fsQ5kMIvnculNx.', 'admin@example.com', 'Administrator', 'admin', 'active', '2025-09-11 16:37:49', '2025-11-07 14:13:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categories_id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `showcases`
--
ALTER TABLE `showcases`
  ADD PRIMARY KEY (`showcases_id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `showcase_images`
--
ALTER TABLE `showcase_images`
  ADD PRIMARY KEY (`showcase_images_id`),
  ADD KEY `showcase_id` (`showcase_id`);

--
-- Indexes for table `showcase_tags`
--
ALTER TABLE `showcase_tags`
  ADD PRIMARY KEY (`showcase_tags_id`),
  ADD KEY `showcase_id` (`showcase_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categories_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `showcases`
--
ALTER TABLE `showcases`
  MODIFY `showcases_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `showcase_images`
--
ALTER TABLE `showcase_images`
  MODIFY `showcase_images_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `showcase_tags`
--
ALTER TABLE `showcase_tags`
  MODIFY `showcase_tags_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `showcases`
--
ALTER TABLE `showcases`
  ADD CONSTRAINT `showcases_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`categories_id`) ON DELETE CASCADE;

--
-- Constraints for table `showcase_images`
--
ALTER TABLE `showcase_images`
  ADD CONSTRAINT `showcase_images_ibfk_1` FOREIGN KEY (`showcase_id`) REFERENCES `showcases` (`showcases_id`) ON DELETE CASCADE;

--
-- Constraints for table `showcase_tags`
--
ALTER TABLE `showcase_tags`
  ADD CONSTRAINT `showcase_tags_ibfk_1` FOREIGN KEY (`showcase_id`) REFERENCES `showcases` (`showcases_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
