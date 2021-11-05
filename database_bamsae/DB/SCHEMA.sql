-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: movie
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auditorium`
--

DROP TABLE IF EXISTS `auditorium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditorium` (
  `theater_id` varchar(10) NOT NULL,
  `audit_id` int NOT NULL AUTO_INCREMENT,
  `audit_no` tinyint NOT NULL,
  `audit_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`audit_id`),
  KEY `theater_id_idx` (`theater_id`),
  CONSTRAINT `audit_FK` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `mem_id` varchar(10) NOT NULL COMMENT '회원아이디',
  `product_id` int NOT NULL,
  `cart_num` int NOT NULL,
  PRIMARY KEY (`mem_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `casting`
--

DROP TABLE IF EXISTS `casting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `casting` (
  `cast_id` int NOT NULL AUTO_INCREMENT,
  `cast_name` varchar(20) NOT NULL,
  `cast_birthday` date NOT NULL,
  `cast_nationality` varchar(15) NOT NULL,
  `cast_type` varchar(500) NOT NULL,
  PRIMARY KEY (`cast_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `diligence`
--

DROP TABLE IF EXISTS `diligence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diligence` (
  `emp_id` varchar(10) NOT NULL,
  `dil_worktime` datetime NOT NULL,
  `dil_leavetime` datetime NOT NULL,
  `dil_schedule` varchar(20) DEFAULT NULL,
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `diligence_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `emp_id` varchar(10) NOT NULL,
  `emp_name` varchar(5) NOT NULL,
  `emp_phone` varchar(15) NOT NULL,
  `emp_gender` tinyint NOT NULL,
  `emp_birth` date NOT NULL,
  `emp_belong` varchar(20) DEFAULT NULL,
  `emp_dept` varchar(10) NOT NULL,
  `emp_rank` varchar(5) NOT NULL,
  `emp_type` varchar(5) NOT NULL,
  `emp_email` varchar(20) NOT NULL,
  `is_resignated` tinyint(1) NOT NULL,
  `emp_join` date NOT NULL,
  `emp_password` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `theater_id_idx` (`emp_belong`),
  CONSTRAINT `theater_id` FOREIGN KEY (`emp_belong`) REFERENCES `theater` (`theater_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `filmography`
--

DROP TABLE IF EXISTS `filmography`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filmography` (
  `movie_id` int NOT NULL COMMENT 'movie_id',
  `cast_id` int NOT NULL,
  PRIMARY KEY (`movie_id`,`cast_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `mem_id` varchar(10) NOT NULL COMMENT '회원아이디',
  `mem_pw` varchar(15) NOT NULL COMMENT '비밀번호',
  `mem_lv` varchar(15) NOT NULL DEFAULT 'Lv.1',
  `mem_name` varchar(15) NOT NULL COMMENT '이름',
  `mem_phone` varchar(15) NOT NULL COMMENT '핸드폰번호',
  `mem_email` varchar(20) NOT NULL COMMENT '이메일주소',
  `mem_birth` date NOT NULL COMMENT '생일',
  `mem_gender` smallint NOT NULL COMMENT '성별',
  `mem_city` varchar(10) NOT NULL COMMENT '주소',
  `mem_address` varchar(20) NOT NULL COMMENT '상세주소',
  `mem_point` int NOT NULL DEFAULT '0' COMMENT '총 포인트',
  `mem_join` date NOT NULL,
  PRIMARY KEY (`mem_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movie_id` int NOT NULL AUTO_INCREMENT COMMENT 'movie_id',
  `movie_title` varchar(50) NOT NULL,
  `movie_summary` text NOT NULL,
  `movie_pre` varchar(50) NOT NULL,
  `movie_type` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notice_board`
--

DROP TABLE IF EXISTS `notice_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_board` (
  `post_no` int NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(10) NOT NULL,
  `theater_id` varchar(20) DEFAULT NULL,
  `post_type` varchar(10) NOT NULL,
  `post_title` varchar(50) NOT NULL,
  `post_content` text,
  `posted_date` datetime NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`post_no`),
  KEY `emp_id` (`emp_id`),
  KEY `notice_board_ibfk_1` (`theater_id`),
  CONSTRAINT `notice_board_ibfk_1` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`),
  CONSTRAINT `notice_board_ibfk_2` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_history`
--

DROP TABLE IF EXISTS `order_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_history` (
  `payment_ID` int NOT NULL,
  `product_id` int NOT NULL,
  `product_amount` int NOT NULL,
  `payment_num` int NOT NULL,
  `payment_date` datetime NOT NULL,
  PRIMARY KEY (`payment_ID`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_history_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_product` (
  `order_id` smallint NOT NULL AUTO_INCREMENT,
  `theater_id` varchar(10) NOT NULL,
  `product_id` int NOT NULL,
  `order_date` datetime NOT NULL,
  `order_quantity` smallint NOT NULL,
  `order_price` smallint NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `theater_id` (`theater_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`),
  CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `point`
--

DROP TABLE IF EXISTS `point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point` (
  `point_id` varchar(10) NOT NULL COMMENT '포인트 id',
  `mem_id` varchar(10) NOT NULL COMMENT '회원아이디',
  `point_type` varchar(2) NOT NULL COMMENT '포인트타입(적립/사용)',
  `point_date` datetime NOT NULL COMMENT '포인트 사용날짜',
  `point_use` varchar(50) NOT NULL COMMENT '포인트 사용처',
  `point_num` smallint NOT NULL,
  PRIMARY KEY (`point_id`),
  KEY `mem_id` (`mem_id`),
  CONSTRAINT `point_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `policy`
--

DROP TABLE IF EXISTS `policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy` (
  `policy_id` tinyint NOT NULL,
  `policy_type` varchar(20) DEFAULT NULL,
  `policy_content` text NOT NULL,
  PRIMARY KEY (`policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `policy_agree`
--

DROP TABLE IF EXISTS `policy_agree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy_agree` (
  `policy_id` tinyint NOT NULL,
  `mem_id` varchar(20) NOT NULL,
  PRIMARY KEY (`policy_id`,`mem_id`),
  KEY `mem_id_idx` (`mem_id`),
  CONSTRAINT `policy_agree_PK` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  CONSTRAINT `policy_id` FOREIGN KEY (`policy_id`) REFERENCES `policy` (`policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_title` varchar(50) NOT NULL,
  `product_price` int NOT NULL,
  `product_img` varchar(50) DEFAULT NULL,
  `product_content` varchar(500) DEFAULT NULL,
  `product_type` varchar(10) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `qna`
--

DROP TABLE IF EXISTS `qna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna` (
  `qna_id` int NOT NULL AUTO_INCREMENT,
  `mem_id` varchar(20) NOT NULL,
  `qna_date` datetime DEFAULT NULL,
  `qna_title` varchar(50) NOT NULL,
  `qna_content` text,
  `qna_category` varchar(20) DEFAULT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`qna_id`),
  KEY `mem_id` (`mem_id`),
  CONSTRAINT `qna_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `mem_id` varchar(20) NOT NULL COMMENT '아이디',
  `price_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `sched_id` int NOT NULL,
  `viewing_date` date NOT NULL,
  `seat_num` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `mem_id` (`mem_id`),
  KEY `price_id` (`price_id`),
  KEY `movie_id` (`movie_id`),
  KEY `sched_id` (`sched_id`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`price_id`) REFERENCES `ticket_price` (`tic_price_id`),
  CONSTRAINT `reservation_ibfk_3` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`),
  CONSTRAINT `reservation_ibfk_4` FOREIGN KEY (`sched_id`) REFERENCES `schedule` (`sched_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservation_details`
--

DROP TABLE IF EXISTS `reservation_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_details` (
  `details_id` int NOT NULL AUTO_INCREMENT,
  `price_id` int NOT NULL,
  `reservation_num` int NOT NULL,
  `sched_id` int NOT NULL,
  `seat_id` int NOT NULL,
  PRIMARY KEY (`details_id`),
  KEY `sched_id` (`sched_id`),
  KEY `price_id` (`price_id`),
  CONSTRAINT `reservation_details_ibfk_1` FOREIGN KEY (`sched_id`) REFERENCES `schedule` (`sched_id`),
  CONSTRAINT `reservation_details_ibfk_2` FOREIGN KEY (`price_id`) REFERENCES `ticket_price` (`tic_price_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reservation_history`
--

DROP TABLE IF EXISTS `reservation_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_history` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `mem_id` varchar(20) NOT NULL,
  `reservation_num` int NOT NULL,
  `payment_date` datetime NOT NULL,
  `total_price` int NOT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `mem_id` (`mem_id`),
  CONSTRAINT `reservation_history_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  CONSTRAINT `reservation_history_ibfk_2` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `mem_id` varchar(10) NOT NULL,
  `review_id` int NOT NULL AUTO_INCREMENT COMMENT '리뷰아이디',
  `movie_id` int NOT NULL COMMENT '영화아이디',
  `review_star` int NOT NULL COMMENT '별점갯수',
  `review_blind` tinyint(1) NOT NULL COMMENT '블라인드여부',
  `review_content` text,
  `review_time` datetime NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `mem_id` (`mem_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salary`
--

DROP TABLE IF EXISTS `salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary` (
  `emp_id` varchar(10) NOT NULL,
  `sal_basic` decimal(5,1) DEFAULT NULL,
  `sal_bonus` decimal(5,1) DEFAULT NULL,
  `sal_monthly` decimal(5,1) NOT NULL,
  `sal_date` date DEFAULT NULL,
  `is_paid` tinyint(1) NOT NULL,
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `theater_id` varchar(20) NOT NULL,
  `sales_date` date NOT NULL,
  `sales_ticket` decimal(9,1) NOT NULL DEFAULT '0.0',
  `sales_product` decimal(9,1) NOT NULL DEFAULT '0.0',
  `sales_salary` decimal(9,1) NOT NULL DEFAULT '0.0',
  `sales_admin` decimal(9,1) NOT NULL DEFAULT '0.0',
  `sales_net` decimal(9,1) NOT NULL DEFAULT '0.0',
  PRIMARY KEY (`theater_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `sched_id` int NOT NULL AUTO_INCREMENT,
  `audit_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `screen_beg` datetime NOT NULL,
  `screen_fin` datetime NOT NULL,
  PRIMARY KEY (`sched_id`),
  KEY `sched_audit_PK_idx` (`audit_id`),
  KEY `sched_movie_PK_idx` (`movie_id`),
  CONSTRAINT `sched_audit_PK` FOREIGN KEY (`audit_id`) REFERENCES `auditorium` (`audit_id`),
  CONSTRAINT `sched_movie_PK` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seats` (
  `audit_id` int NOT NULL,
  `seat_no` varchar(3) NOT NULL,
  PRIMARY KEY (`audit_id`,`seat_no`),
  CONSTRAINT `seats_PK` FOREIGN KEY (`audit_id`) REFERENCES `auditorium` (`audit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `theater_id` varchar(10) NOT NULL,
  `product_id` int NOT NULL,
  `stock_quantity` smallint NOT NULL,
  KEY `theater_id` (`theater_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`),
  CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `store_order`
--

DROP TABLE IF EXISTS `store_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `mem_id` varchar(15) NOT NULL,
  `order_num` int NOT NULL,
  `order_date` datetime NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `mem_id` (`mem_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `store_order_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  CONSTRAINT `store_order_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `theater`
--

DROP TABLE IF EXISTS `theater`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theater` (
  `theater_id` varchar(20) NOT NULL,
  `theater_name` varchar(20) NOT NULL,
  `theater_loc` varchar(50) NOT NULL,
  `theater_call` varchar(15) NOT NULL,
  `theater_info` text NOT NULL,
  PRIMARY KEY (`theater_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket_price`
--

DROP TABLE IF EXISTS `ticket_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_price` (
  `tic_price_id` int NOT NULL AUTO_INCREMENT,
  `audit_type` varchar(30) NOT NULL,
  `tic_price` int NOT NULL,
  `audience_type` varchar(12) NOT NULL,
  PRIMARY KEY (`tic_price_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wish`
--

DROP TABLE IF EXISTS `wish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wish` (
  `mem_id` varchar(10) NOT NULL COMMENT '회원아이디',
  `movie_id` int NOT NULL COMMENT '영화아이디',
  PRIMARY KEY (`mem_id`,`movie_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `wish_ibfk_1` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`),
  CONSTRAINT `wish_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-05  5:30:23
