-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 04, 2024 at 10:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Groceries`
--

-- --------------------------------------------------------

--
-- Table structure for table `address_detail`
--

CREATE TABLE `address_detail` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(50) NOT NULL DEFAULT '',
  `phone` varchar(20) NOT NULL DEFAULT '',
  `address` varchar(200) NOT NULL DEFAULT '',
  `city` varchar(75) NOT NULL DEFAULT '',
  `state` varchar(75) NOT NULL DEFAULT '',
  `type_name` varchar(50) NOT NULL DEFAULT '',
  `postal_code` varchar(20) NOT NULL DEFAULT '',
  `is_default` int(1) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address_detail`
--

INSERT INTO `address_detail` (`address_id`, `user_id`, `name`, `phone`, `address`, `city`, `state`, `type_name`, `postal_code`, `is_default`, `status`, `created_date`, `modify_date`) VALUES
(1, 4, 'Subham ', '+91-1111111111', 'ncuhwff3f834n, u43ghcn3,n3u4fh  h423,bvj3i', 'CTC', 'KOSAL', 'Home', '111111', 1, 1, '2024-07-05 18:51:23', '2024-07-05 19:02:18');

-- --------------------------------------------------------

--
-- Table structure for table `area_detail`
--

CREATE TABLE `area_detail` (
  `area_id` int(11) NOT NULL,
  `zone_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(100) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `area_detail`
--

INSERT INTO `area_detail` (`area_id`, `zone_id`, `name`, `status`, `created_date`, `modify_date`) VALUES
(1, 1, 'lxsgr', 1, '2024-07-04 11:48:56', '2024-07-04 11:48:56'),
(2, 1, 'jrpda', 1, '2024-07-04 11:49:13', '2024-07-04 11:49:13'),
(3, 1, 'klpna', 2, '2024-07-04 11:49:19', '2024-07-04 11:52:06');

-- --------------------------------------------------------

--
-- Table structure for table `brand_detail`
--

CREATE TABLE `brand_detail` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(150) NOT NULL DEFAULT '',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1:active,2:deleted',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand_detail`
--

INSERT INTO `brand_detail` (`brand_id`, `brand_name`, `status`, `created_date`, `modify_date`) VALUES
(1, 'bigies', 2, '2024-07-02 16:52:03', '2024-07-02 17:03:13'),
(2, 'bigies', 2, '2024-07-02 16:56:32', '2024-07-02 17:02:05'),
(3, 'alphonso', 2, '2024-07-02 16:58:32', '2024-07-02 16:59:36'),
(4, 'alphonso', 2, '2024-07-02 17:03:23', '2024-07-02 17:04:57');

-- --------------------------------------------------------

--
-- Table structure for table `cart_detail`
--

CREATE TABLE `cart_detail` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `prod_id` int(11) NOT NULL DEFAULT 0,
  `qty` int(11) NOT NULL DEFAULT 1,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_detail`
--

INSERT INTO `cart_detail` (`cart_id`, `user_id`, `prod_id`, `qty`, `status`, `created_date`, `modify_date`) VALUES
(1, 4, 1, 3, 2, '2024-07-05 12:50:58', '2024-07-05 13:00:01'),
(2, 4, 3, 4, 2, '2024-07-05 12:52:46', '2024-07-09 11:58:50'),
(3, 4, 4, 4, 1, '2024-07-05 12:52:49', '2024-07-09 11:58:50');

-- --------------------------------------------------------

--
-- Table structure for table `category_details`
--

CREATE TABLE `category_details` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(100) NOT NULL DEFAULT '',
  `image` varchar(75) NOT NULL DEFAULT '',
  `color` varchar(10) NOT NULL DEFAULT '000000',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT 'delete',
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_details`
--

INSERT INTO `category_details` (`cat_id`, `cat_name`, `image`, `color`, `status`, `create_date`, `modify_date`) VALUES
(1, 'fruits', 'category/2024070219520252210jAn7vGeGaI2iZzBfzj.png', 'F8A446', 1, '2024-07-02 19:52:02', '2024-07-02 20:19:40'),
(2, 'Pulses', 'category/2024070219551955196CvMtnptai8aMXb5PnWC.png', '7A7B7A', 1, '2024-07-02 19:53:10', '2024-07-02 20:22:10'),
(3, 'Bevarages', 'category/2024070219520252210jAn7vGeGaI2iZzBfzj.png', 'A020F0', 1, '2024-07-02 19:52:02', '2024-07-02 20:19:40');

-- --------------------------------------------------------

--
-- Table structure for table `favourite_detail`
--

CREATE TABLE `favourite_detail` (
  `fav_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favourite_detail`
--

INSERT INTO `favourite_detail` (`fav_id`, `prod_id`, `user_id`, `status`, `created_date`, `modify_date`) VALUES
(4, 8, 4, 1, '2024-07-05 12:27:36', '2024-07-05 12:27:36'),
(19, 6, 4, 1, '2024-08-03 23:52:20', '2024-08-03 23:52:20'),
(20, 4, 4, 1, '2024-08-04 01:25:24', '2024-08-04 01:25:24'),
(21, 5, 4, 1, '2024-08-04 01:25:37', '2024-08-04 01:25:37');

-- --------------------------------------------------------

--
-- Table structure for table `image_detail`
--

CREATE TABLE `image_detail` (
  `img_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL DEFAULT 0,
  `image` varchar(75) NOT NULL DEFAULT '',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1:active,2:delete',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image_detail`
--

INSERT INTO `image_detail` (`img_id`, `prod_id`, `image`, `status`, `created_date`, `modify_date`) VALUES
(1, 4, 'product/202407031003423424dnEQIw3cSCj4Hsev7Yp.png', 1, '2024-07-03 10:03:42', '2024-07-03 10:03:42'),
(2, 4, 'product/20240703100342342ogwgohTyuZ81JjkEteMJ.png', 1, '2024-07-03 10:03:42', '2024-07-03 10:03:42'),
(3, 5, 'product/2024070310040444Y5JPSTcJ2n12kug0HVT5.png', 1, '2024-07-03 10:04:04', '2024-07-03 10:04:04'),
(4, 5, 'product/2024070310040444N4KORRded4Ino89tHKWu.png', 1, '2024-07-03 10:04:04', '2024-07-03 10:04:04'),
(5, 6, 'product/2024070310070575OMcIXzWyY2BuIcom0shF.png', 1, '2024-07-03 10:07:05', '2024-07-03 10:07:05'),
(6, 6, 'product/2024070310070575SD7HuchAPwiHLf0II7Kl.png', 2, '2024-07-03 10:07:05', '2024-07-03 18:38:16'),
(7, 7, 'product/202407031010131013daJclDACd6BjtxsRc4lU.png', 1, '2024-07-03 10:10:13', '2024-07-03 10:10:13'),
(8, 7, 'product/202407031010131013nL0xqxpKILP5eoG1KH3s.png', 1, '2024-07-03 10:10:13', '2024-07-03 10:10:13'),
(9, 8, 'product/202407031011321132k60K8NNMPjNzfVzNJwDx.png', 1, '2024-07-03 10:11:32', '2024-07-03 10:11:32'),
(10, 8, 'product/202407031011321132miu8U1lLb7Xr0LdDE8Mn.png', 1, '2024-07-03 10:11:32', '2024-07-03 10:11:32'),
(11, 9, 'product/202407031013221322u26YKg8U5jhaL7Hsce5C.png', 1, '2024-07-03 10:13:22', '2024-07-03 10:13:22'),
(12, 9, 'product/2024070310132213222Mg6WenX4lJZZTiJkb1b.png', 1, '2024-07-03 10:13:22', '2024-07-03 10:13:22'),
(13, 10, 'product/202407031015141514I5fQdKdIGo5bhgzWg8vG.png', 1, '2024-07-03 10:15:14', '2024-07-03 10:15:14'),
(14, 10, 'product/202407031015141514d6njkrJLxRqywkTfWxa2.png', 1, '2024-07-03 10:15:14', '2024-07-03 10:15:14'),
(15, 11, 'product/202407031025122512ieAKXioVT8JuHUSFhwgv.png', 1, '2024-07-03 10:25:12', '2024-07-03 10:25:12'),
(16, 11, 'product/202407031025122512bEaknuwTqzN9AQR0UFNm.png', 1, '2024-07-03 10:25:12', '2024-07-03 10:25:12'),
(17, 11, 'product/2024070318343134310VfCALhwM1os7f0TBbGP.png', 1, '2024-07-03 18:34:31', '2024-07-03 18:34:31'),
(18, 1, 'product/2024070319565656563fxJquql86GwlQvA1ZVf.png', 1, '2024-07-03 19:56:56', '2024-07-03 19:56:56'),
(19, 1, 'product/202407031958255825kHFZwdbxZhW2dAHTtNmI.png', 1, '2024-07-03 19:58:25', '2024-07-03 19:58:25'),
(20, 1, 'product/20240703200018018TdrffTaXY231o6pubnxa.png', 1, '2024-07-03 20:00:18', '2024-07-03 20:00:18'),
(21, 1, 'product/20240703200254254OZhn9NKDM8U4SFfztoOt.png', 1, '2024-07-03 20:02:54', '2024-07-03 20:02:54'),
(22, 1, 'product/202407041020532053ISTRVGVJ1GZI0GG3nSP7.png', 1, '2024-07-04 10:20:53', '2024-07-04 10:20:53');

-- --------------------------------------------------------

--
-- Table structure for table `notification_detail`
--

CREATE TABLE `notification_detail` (
  `notification_id` int(11) NOT NULL,
  `ref_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(100) NOT NULL DEFAULT '',
  `is_read` int(1) NOT NULL DEFAULT 1 COMMENT '1:new , 2:read',
  `message` varchar(500) NOT NULL DEFAULT '',
  `notification_type` int(1) NOT NULL DEFAULT 1,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification_detail`
--

INSERT INTO `notification_detail` (`notification_id`, `ref_id`, `user_id`, `title`, `is_read`, `message`, `notification_type`, `status`, `created_date`, `modify_date`) VALUES
(2, 2, 4, 'Order payment fail', 2, 'your order #2 payment fail.', 2, 1, '2024-07-09 12:05:08', '2024-07-09 14:28:18'),
(3, 2, 4, 'Order payment successfully', 2, 'your order #2 payment successfully.', 2, 1, '2024-07-09 12:06:36', '2024-07-09 14:28:18'),
(4, 3, 4, 'Order Accepted', 2, 'your order #3 accepted.', 2, 1, '2024-07-09 12:19:36', '2024-07-09 14:28:18'),
(5, 3, 4, '', 2, '', 2, 1, '2024-07-09 12:20:09', '2024-07-09 14:28:18'),
(6, 3, 4, 'Order Accepted', 2, 'your order #3 accepted.', 2, 1, '2024-07-09 12:21:38', '2024-07-09 14:28:18');

-- --------------------------------------------------------

--
-- Table structure for table `nutrition_detail`
--

CREATE TABLE `nutrition_detail` (
  `nutrition_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL DEFAULT 0,
  `nutrition_name` varchar(120) NOT NULL DEFAULT '',
  `nutrition_value` varchar(50) NOT NULL DEFAULT '',
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nutrition_detail`
--

INSERT INTO `nutrition_detail` (`nutrition_id`, `prod_id`, `nutrition_name`, `nutrition_value`, `status`, `created_date`, `modify_date`) VALUES
(1, 10, 'Calories', '104', 2, '2024-07-03 10:15:14', '2024-07-03 18:29:40'),
(2, 10, 'fat', '0.3g', 1, '2024-07-03 10:15:14', '2024-07-03 10:15:14'),
(3, 11, 'Calories', '104', 1, '2024-07-03 10:25:12', '2024-07-03 10:25:12'),
(4, 11, 'fat', '0.3g', 1, '2024-07-03 10:25:12', '2024-07-03 10:25:12'),
(5, 1, 'spellings', '400', 1, '2024-07-03 18:20:09', '2024-07-03 18:36:47');

-- --------------------------------------------------------

--
-- Table structure for table `offer_detail`
--

CREATE TABLE `offer_detail` (
  `offer_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL DEFAULT 0,
  `start_date` datetime NOT NULL DEFAULT current_timestamp(),
  `end_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offer_detail`
--

INSERT INTO `offer_detail` (`offer_id`, `prod_id`, `price`, `start_date`, `end_date`, `status`, `created_date`, `modify_date`) VALUES
(1, 1, 5, '2024-07-10 00:00:00', '2024-08-10 00:00:00', 1, '2024-07-04 12:18:18', '2024-07-04 12:18:18'),
(2, 3, 2, '2024-07-10 00:00:00', '2024-08-10 00:00:00', 1, '2024-07-04 12:19:09', '2024-07-04 12:19:09'),
(3, 4, 1, '2024-07-10 00:00:00', '2024-08-10 00:00:00', 1, '2024-07-04 12:19:17', '2024-07-04 12:19:17'),
(4, 5, 2, '2024-07-10 00:00:00', '2024-08-10 00:00:00', 1, '2024-07-04 12:19:25', '2024-07-04 12:19:25'),
(5, 1, 5, '2024-07-10 00:00:00', '2024-08-10 00:00:00', 1, '2024-07-04 12:24:02', '2024-07-04 12:24:02'),
(6, 1, 5, '2024-07-10 00:00:00', '2024-08-10 00:00:00', 2, '2024-07-04 13:15:58', '2024-07-04 13:17:21');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `order_id` int(11) NOT NULL,
  `cart_id` varchar(500) NOT NULL DEFAULT '' COMMENT '1,2,3,4,5',
  `user_id` int(11) NOT NULL DEFAULT 0,
  `address_id` int(11) NOT NULL DEFAULT 0,
  `total_price` int(11) NOT NULL DEFAULT 0,
  `user_pay_price` int(11) NOT NULL DEFAULT 0,
  `discount_price` int(11) NOT NULL DEFAULT 0,
  `deliver_price` int(11) NOT NULL DEFAULT 0,
  `promo_code_id` varchar(20) NOT NULL DEFAULT '',
  `deliver_type` int(1) NOT NULL DEFAULT 1 COMMENT '1: deliver , 2: collection',
  `payment_type` int(1) NOT NULL DEFAULT 1 COMMENT '1:COD , 2: Online',
  `payment_status` int(1) NOT NULL DEFAULT 1 COMMENT '1:waiting,2:success,3:failed,4:refund',
  `order_status` int(1) NOT NULL DEFAULT 1 COMMENT '1:new , 2:Order accepted,3:Order delivered,4:cancel,5:Order declined',
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`order_id`, `cart_id`, `user_id`, `address_id`, `total_price`, `user_pay_price`, `discount_price`, `deliver_price`, `promo_code_id`, `deliver_type`, `payment_type`, `payment_status`, `order_status`, `status`, `created_date`, `modify_date`) VALUES
(3, '3', 4, 1, 12, 13, 1, 2, '1', 1, 2, 1, 2, 1, '2024-07-09 11:58:50', '2024-07-09 12:21:38');

-- --------------------------------------------------------

--
-- Table structure for table `order_payment_detail`
--

CREATE TABLE `order_payment_detail` (
  `transaction_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `transaction_payload` varchar(5000) NOT NULL DEFAULT '',
  `payment_transaction_id` varchar(100) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_payment_detail`
--

INSERT INTO `order_payment_detail` (`transaction_id`, `order_id`, `transaction_payload`, `payment_transaction_id`, `status`, `created_date`, `modify_date`) VALUES
(3, 2, 'cn4wih23892328ueu123nijhg43', 'BH7Y38473266582375632UD8', 1, '2024-07-09 12:05:08', '2024-07-09 12:05:08'),
(4, 2, 'cn4wih23892328ueu123nijhg43', 'BH7Y38473266582375632UD8', 2, '2024-07-09 12:06:36', '2024-07-09 12:06:36');

-- --------------------------------------------------------

--
-- Table structure for table `payment_method_detail`
--

CREATE TABLE `payment_method_detail` (
  `pay_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `card_number` varchar(20) NOT NULL DEFAULT '',
  `card_month` varchar(3) NOT NULL DEFAULT '',
  `card_year` varchar(5) NOT NULL DEFAULT '',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1: actv , 2: dltd',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_method_detail`
--

INSERT INTO `payment_method_detail` (`pay_id`, `user_id`, `name`, `card_number`, `card_month`, `card_year`, `status`, `created_date`, `modify_date`) VALUES
(1, 4, 'subham sahoo', '0000-0000-0000-0000', '11', '26', 1, '2024-07-05 20:57:56', '2024-07-05 20:57:56');

-- --------------------------------------------------------

--
-- Table structure for table `product_detail`
--

CREATE TABLE `product_detail` (
  `prod_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL DEFAULT 0,
  `brand_id` int(11) NOT NULL DEFAULT 0,
  `type_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(200) NOT NULL DEFAULT '',
  `detail` varchar(5000) NOT NULL DEFAULT '',
  `unit_name` varchar(50) NOT NULL DEFAULT '',
  `unit_value` varchar(20) NOT NULL DEFAULT '',
  `nutrition_weight` varchar(20) NOT NULL DEFAULT '100g',
  `price` int(11) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1:active.2:delete',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_detail`
--

INSERT INTO `product_detail` (`prod_id`, `cat_id`, `brand_id`, `type_id`, `name`, `detail`, `unit_name`, `unit_value`, `nutrition_weight`, `price`, `status`, `created_date`, `modify_date`) VALUES
(1, 1, 1, 1, 'Wizard', 'Wizard Baby', 'KG', '2', '400g', 6, 1, '2024-07-03 09:55:10', '2024-07-03 09:55:10'),
(3, 1, 1, 1, 'El primo', 'El PRIMO BABY', 'KG', '1', '200g', 3, 1, '2024-07-03 10:02:43', '2024-07-03 10:02:43'),
(4, 1, 1, 1, 'El primo', 'El PRIMO BABY', 'KG', '1', '200g', 3, 1, '2024-07-03 10:03:42', '2024-07-03 10:03:42'),
(5, 1, 1, 1, 'El primo', 'El PRIMO BABY', 'KG', '1', '200g', 3, 1, '2024-07-03 10:04:04', '2024-07-03 10:04:04'),
(6, 1, 1, 1, 'El primo', 'El PRIMO BABY', 'KG', '1', '200g', 3, 1, '2024-07-03 10:07:05', '2024-07-03 10:07:05'),
(7, 1, 1, 1, 'El primo', 'El PRIMO BABY', 'KG', '1', '200g', 3, 2, '2024-07-03 10:10:13', '2024-07-03 10:10:13'),
(8, 1, 1, 1, 'El primo', 'El PRIMO BABY', 'KG', '1', '200g', 3, 1, '2024-07-03 10:11:32', '2024-07-03 10:11:32'),
(9, 1, 1, 1, 'El primo', 'El PRIMO BABY', 'KG', '1', '200g', 3, 1, '2024-07-03 10:13:22', '2024-07-03 10:13:22'),
(10, 1, 1, 1, 'El primo', 'El PRIMO BABY', 'KG', '1', '200g', 3, 2, '2024-07-03 10:15:14', '2024-07-03 11:54:06'),
(11, 1, 1, 1, 'El primo', 'El PRIMO BABY', 'KG', '1', '200g', 30, 1, '2024-07-03 10:25:12', '2024-07-03 11:53:39');

-- --------------------------------------------------------

--
-- Table structure for table `promo_code_details`
--

CREATE TABLE `promo_code_details` (
  `promo_code_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL DEFAULT '',
  `title` varchar(200) NOT NULL DEFAULT '',
  `description` varchar(5000) NOT NULL DEFAULT '',
  `type` int(1) NOT NULL DEFAULT 1 COMMENT '1 = per% , 2 = fixed',
  `min_order_amount` int(11) NOT NULL DEFAULT 0,
  `max_discount_amount` int(11) NOT NULL DEFAULT 0,
  `offer_price` int(11) NOT NULL DEFAULT 0,
  `start_date` datetime NOT NULL DEFAULT current_timestamp(),
  `end_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `promo_code_details`
--

INSERT INTO `promo_code_details` (`promo_code_id`, `code`, `title`, `description`, `type`, `min_order_amount`, `max_discount_amount`, `offer_price`, `start_date`, `end_date`, `status`, `created_date`, `modify_date`) VALUES
(1, 'SAVE5', 'Save 5% more', 'get upto 5% off ', 1, 5, 10, 10, '2024-07-04 00:00:00', '2024-07-15 00:00:00', 1, '2024-07-05 19:30:41', '2024-07-05 19:30:41'),
(2, 'SAVE10', 'SAVE15', 'save 15% or more ', 1, 20, 30, 10, '2024-07-10 00:00:00', '2024-07-17 00:00:00', 2, '2024-07-05 19:34:14', '2024-07-05 19:35:22');

-- --------------------------------------------------------

--
-- Table structure for table `review_detail`
--

CREATE TABLE `review_detail` (
  `review_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL DEFAULT 0,
  `prod_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `rate` varchar(5) NOT NULL DEFAULT '',
  `message` varchar(1000) NOT NULL DEFAULT '',
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review_detail`
--

INSERT INTO `review_detail` (`review_id`, `order_id`, `prod_id`, `user_id`, `rate`, `message`, `status`, `created_date`, `modify_date`) VALUES
(1, 3, 4, 4, '5', 'good', 1, '2024-07-09 12:13:48', '2024-07-09 12:13:48');

-- --------------------------------------------------------

--
-- Table structure for table `type_detail`
--

CREATE TABLE `type_detail` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(100) NOT NULL DEFAULT '',
  `image` varchar(75) NOT NULL DEFAULT '',
  `color` varchar(8) NOT NULL DEFAULT '000000',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1:active,2:delete',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `type_detail`
--

INSERT INTO `type_detail` (`type_id`, `type_name`, `image`, `color`, `status`, `created_date`, `modify_date`) VALUES
(1, 'BarbarianKing', 'type/2024070220415941595EZCsBPParQ6ak2ytuXM.png', 'F8A446', 1, '2024-07-02 20:39:34', '2024-07-02 20:41:59'),
(2, 'Dynamike', 'type/202407022044244424VY8QCedrHHjY0YDYJMd8.png', 'FFFFFF', 2, '2024-07-02 20:44:24', '2024-07-02 20:44:52');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_id` int(11) NOT NULL,
  `username` varchar(75) NOT NULL DEFAULT '',
  `user_type` int(1) NOT NULL DEFAULT 1 COMMENT '1:user,2:admin',
  `name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `mobile` varchar(15) NOT NULL DEFAULT '',
  `mobile_code` varchar(6) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `area_id` int(11) NOT NULL DEFAULT 0,
  `auth_token` varchar(100) NOT NULL DEFAULT '',
  `device_token` varchar(150) NOT NULL DEFAULT '',
  `reset_code` varchar(8) NOT NULL DEFAULT '0000',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1:Active , 2:Delete',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_id`, `username`, `user_type`, `name`, `email`, `mobile`, `mobile_code`, `password`, `area_id`, `auth_token`, `device_token`, `reset_code`, `status`, `created_date`, `modify_date`) VALUES
(1, 'admin', 2, 'admin', 'admin@admin.com', '', '', '111111', 0, 'iX2SsZRtSi7AfdNPsCfF', '1234567890', '0000', 1, '2024-07-02 15:46:57', '2024-07-09 12:26:36'),
(4, 'alphauser2', 1, 'alphauser2', 'something2@gmail.com', '8989898989', '898989', '111111', 0, 'pM4vMxjKHIiGkx6BDZ0s', '', '5083', 1, '2024-07-02 15:24:15', '2024-07-30 18:14:26'),
(6, 'NanduBhai', 1, '', 'Nandu@hotmail.com', '', '', '696969', 0, 'xL3HaMmWkQqVogz97tUM', '', '0000', 1, '2024-07-22 23:30:24', '2024-07-23 20:10:21'),
(7, 'chodhury', 1, '', 'chodhury@pussmail.com', '', '', '707070', 0, 'ic63WVArnpyCUeF1HKHe', '', '0000', 1, '2024-07-22 23:32:41', '2024-07-22 23:32:41'),
(8, 'alphauser', 1, '', 'something3@gmail.com', '', '', '000000', 0, 'GEHux6iAbvjalhOZBVyV', '', '0000', 1, '2024-07-23 18:20:06', '2024-07-23 18:20:06'),
(9, 'Subham', 1, '', 'subham@gmail.com', '', '', '161616', 0, 'k1oK4K1yQ89KEK5xexrd', '', '0000', 1, '2024-07-23 20:10:47', '2024-07-30 18:33:03'),
(10, 'Kshirod', 1, '', 'kshirod@yahoomail.com', '', '', '050505', 0, 'Xobsb9knRo2Zxbtk2h0y', '', '0000', 1, '2024-07-23 20:15:41', '2024-07-25 01:14:35');

-- --------------------------------------------------------

--
-- Table structure for table `zone_detail`
--

CREATE TABLE `zone_detail` (
  `zone_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zone_detail`
--

INSERT INTO `zone_detail` (`zone_id`, `name`, `status`, `created_date`, `modify_date`) VALUES
(1, 'BBE', 1, '2024-07-04 10:43:32', '2024-07-04 10:44:32'),
(2, 'CTC', 1, '2024-07-04 10:49:30', '2024-07-04 10:50:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address_detail`
--
ALTER TABLE `address_detail`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `area_detail`
--
ALTER TABLE `area_detail`
  ADD PRIMARY KEY (`area_id`);

--
-- Indexes for table `brand_detail`
--
ALTER TABLE `brand_detail`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `category_details`
--
ALTER TABLE `category_details`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `favourite_detail`
--
ALTER TABLE `favourite_detail`
  ADD PRIMARY KEY (`fav_id`);

--
-- Indexes for table `image_detail`
--
ALTER TABLE `image_detail`
  ADD PRIMARY KEY (`img_id`);

--
-- Indexes for table `notification_detail`
--
ALTER TABLE `notification_detail`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `nutrition_detail`
--
ALTER TABLE `nutrition_detail`
  ADD PRIMARY KEY (`nutrition_id`);

--
-- Indexes for table `offer_detail`
--
ALTER TABLE `offer_detail`
  ADD PRIMARY KEY (`offer_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_payment_detail`
--
ALTER TABLE `order_payment_detail`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `payment_method_detail`
--
ALTER TABLE `payment_method_detail`
  ADD PRIMARY KEY (`pay_id`);

--
-- Indexes for table `product_detail`
--
ALTER TABLE `product_detail`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indexes for table `promo_code_details`
--
ALTER TABLE `promo_code_details`
  ADD PRIMARY KEY (`promo_code_id`);

--
-- Indexes for table `review_detail`
--
ALTER TABLE `review_detail`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `type_detail`
--
ALTER TABLE `type_detail`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `zone_detail`
--
ALTER TABLE `zone_detail`
  ADD PRIMARY KEY (`zone_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address_detail`
--
ALTER TABLE `address_detail`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `area_detail`
--
ALTER TABLE `area_detail`
  MODIFY `area_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `brand_detail`
--
ALTER TABLE `brand_detail`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cart_detail`
--
ALTER TABLE `cart_detail`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category_details`
--
ALTER TABLE `category_details`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `favourite_detail`
--
ALTER TABLE `favourite_detail`
  MODIFY `fav_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `image_detail`
--
ALTER TABLE `image_detail`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `notification_detail`
--
ALTER TABLE `notification_detail`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `nutrition_detail`
--
ALTER TABLE `nutrition_detail`
  MODIFY `nutrition_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `offer_detail`
--
ALTER TABLE `offer_detail`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_payment_detail`
--
ALTER TABLE `order_payment_detail`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment_method_detail`
--
ALTER TABLE `payment_method_detail`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product_detail`
--
ALTER TABLE `product_detail`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `promo_code_details`
--
ALTER TABLE `promo_code_details`
  MODIFY `promo_code_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `review_detail`
--
ALTER TABLE `review_detail`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `type_detail`
--
ALTER TABLE `type_detail`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `zone_detail`
--
ALTER TABLE `zone_detail`
  MODIFY `zone_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
