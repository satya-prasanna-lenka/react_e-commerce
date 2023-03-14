-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2023 at 06:51 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopnow`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE `admin_login` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_login`
--

INSERT INTO `admin_login` (`id`, `name`, `email`, `password`, `token`, `status`) VALUES
(5, 'satya prasanna lenka', 'satyale39@gmail.com', '$2y$10$qKgBdiNf9dGJoTKgTwxYauaGzTKK3bjIWBwdrKbnWpOnojQ3Yl5oq', '048180c6fc233695e18b1903befdb6', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `admin_upload`
--

CREATE TABLE `admin_upload` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `dPrice` varchar(20) NOT NULL,
  `sPrice` varchar(20) NOT NULL,
  `disc` varchar(200) NOT NULL,
  `catagory` varchar(50) NOT NULL,
  `mainImage` mediumblob NOT NULL,
  `subImage1` mediumblob NOT NULL,
  `subImage2` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin_upload`
--

INSERT INTO `admin_upload` (`id`, `name`, `dPrice`, `sPrice`, `disc`, `catagory`, `mainImage`, `subImage1`, `subImage2`) VALUES
(18, 'Women Maxi Black Dress', '1799', '3923', 'Women Maxi Black Dress', 'women', 0x3332322e6a7067, 0x3232322e6a7067, 0x3131312e6a7067),
(19, 'Women Ethnic Dress Green Dress', '1699', '509', 'Women Ethnic Dress Green Dress', 'women', 0x3131312e6a7067, 0x3434342e6a7067, 0x3232322e6a7067),
(20, 'Women Wrap Pink Dress', '1999', '3977', 'Women Wrap Pink Dress', 'women', 0x3434342e6a7067, 0x3232322e6a7067, 0x3332322e6a7067),
(21, 'Men Slim Fit Checkered Spread Collar Casual Shirt', '1999', '360', 'Men Slim Fit Checkered Spread Collar Casual Shirt', 'shirt', 0x3232322e6a7067, 0x3131312e6a7067, 0x3434342e6a7067),
(23, 'Men Slim Fit Printed Casual Shirt', '1499', '439', 'Men Slim Fit Printed Casual Shirt', 'shirt', 0x3434342e6a7067, 0x3232322e6a7067, 0x3332322e6a7067),
(24, 'Boys Casual T-shirt Pant  (Black)', '1499', '361', 'Boys Casual T-shirt Pant  (Black)', 'boy', 0x3232322e6a7067, 0x3434342e6a7067, 0x3131312e6a7067),
(25, 'Boys Festive & Party Kurta and Pyjama Set  (Red Pack of 1)', '1299', '262', 'Boys Festive & Party Kurta and Pyjama Set  (Red Pack of 1)', 'boy', 0x3332322e6a7067, 0x3434342e6a7067, 0x3131312e6a7067),
(28, 'Boys Festive & Party Blazer, Shirt and Trouser Set  (Pink Pack of 1)', '1299', '398', 'Boys Festive & Party Blazer, Shirt and Trouser Set  (Pink Pack of 1)', 'boy', 0x3131312e6a7067, 0x3232322e6a7067, 0x3434342e6a7067),
(44, 'Men Regular Fit Striped Spread Collar Casual Shirt', '77060', '49900', 'Men Regular Fit Striped Spread Collar Casual Shirt', 'shirt', 0x3434342e6a7067, 0x3332322e6a7067, 0x3131312e6a7067);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `street` varchar(100) NOT NULL,
  `apartment` varchar(50) NOT NULL,
  `town` varchar(50) NOT NULL,
  `dis` varchar(20) NOT NULL,
  `pin` varchar(10) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `msg` text NOT NULL,
  `orderDetails` text NOT NULL,
  `total` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_signin`
--

CREATE TABLE `user_signin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_signin`
--

INSERT INTO `user_signin` (`id`, `name`, `email`, `password`, `token`, `status`) VALUES
(34, 'satya prasanna lenka', 'satyale39@gmail.com', '$2y$10$VApMGn8Q6f8cyMIrGxprSOh0G6Gb2DdF7gt8Weh0flcILlan5lM96', 'cb25502de2542b88ef0a0737393697', 'active'),
(35, 'sanjay', 'skbera.1502@gmail.com', '$2y$10$EGHbedEdn.gEGaeZzp7GkePxkzrq3fGGMjCKguWiLgwtcUO5kwRdO', '3a2c2f8e894f0e37f8477b4c3e9b18', 'inactive'),
(36, 'satya prasanna lenka', 'webtechd7@gmail.com', '$2y$10$oIh4ov/YA0gQ84LOub2EWOCTNhbDiMfj6sFaVxpbspF8dRhqPyTw6', '53a09bc4210e8d7e78706d6102a416', 'inactive'),
(39, 'klinton', 'satyale99@gmail.com', '$2y$10$n6Pz.sQq2kN5id5A/G0m1.yKs1pgC21YzhvNrSuFsOGRbPGXkeZD2', '5bd8aa640945cf0005b437caf21706', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_login`
--
ALTER TABLE `admin_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_upload`
--
ALTER TABLE `admin_upload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_signin`
--
ALTER TABLE `user_signin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_login`
--
ALTER TABLE `admin_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `admin_upload`
--
ALTER TABLE `admin_upload`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `user_signin`
--
ALTER TABLE `user_signin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
