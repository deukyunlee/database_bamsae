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
-- Dumping data for table `auditorium`
--

LOCK TABLES `auditorium` WRITE;
/*!40000 ALTER TABLE `auditorium` DISABLE KEYS */;
INSERT INTO `auditorium` VALUES ('BU102',1,1,NULL),('SE203',2,1,'IMAX');
/*!40000 ALTER TABLE `auditorium` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES ('abc',2,1),('qwe',2,2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `casting`
--

LOCK TABLES `casting` WRITE;
/*!40000 ALTER TABLE `casting` DISABLE KEYS */;
INSERT INTO `casting` VALUES (1,'하정우','1970-01-04','한국','강림'),(2,'맷 데이먼','1972-05-23','미국','윌 헌팅');
/*!40000 ALTER TABLE `casting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `diligence`
--

LOCK TABLES `diligence` WRITE;
/*!40000 ALTER TABLE `diligence` DISABLE KEYS */;
INSERT INTO `diligence` VALUES ('A-001','2021-10-04 09:00:00','2021-10-04 18:00:00',NULL),('B-001','2021-10-04 09:05:00','2021-10-04 18:05:00','10/05 연차');
/*!40000 ALTER TABLE `diligence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('A-001','홍길동','010-1234-5678',1,'1999-09-09','BU102','마케팅부','과장','정규직','hongil@gmail.com',0,'2016-02-02',NULL),('B-001','이아무개','010-1111-2222',2,'1998-08-08','SE203','회계부','팀장','정규직','amugae@gmail.com',0,'2017-02-02','pass!@#');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `filmography`
--

LOCK TABLES `filmography` WRITE;
/*!40000 ALTER TABLE `filmography` DISABLE KEYS */;
INSERT INTO `filmography` VALUES (1,2),(2,1);
/*!40000 ALTER TABLE `filmography` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('abc','abc','Lv.1','홍길동','010-1111-2222','abc@google.com','1997-09-03',1,'안산시 상록구','한양대학교',0,'2021-11-05'),('qwe','qwe','Lv.2','이갑순','010-2222-3333','qwe@google.com','1992-04-23',1,'안산시 상록구','한양대학교',500,'2021-11-05');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'이터널스','마동석 나오는 영화','우선 생략','3D'),(2,'마음이','강아지가 귀엽습니다','우선 생략','2D');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notice_board`
--

LOCK TABLES `notice_board` WRITE;
/*!40000 ALTER TABLE `notice_board` DISABLE KEYS */;
INSERT INTO `notice_board` VALUES (1,'A-001','BU102','극장','오늘 휴무입니다.','공지 내용','2021-11-05 01:32:42',NULL),(2,'B-001',NULL,'통합','이벤트 공지입니다.','이벤트 내용','2021-11-05 01:32:42',NULL);
/*!40000 ALTER TABLE `notice_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order_history`
--

LOCK TABLES `order_history` WRITE;
/*!40000 ALTER TABLE `order_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` VALUES (1,'BU102',1,'2021-01-01 16:00:00',10,5000),(2,'SE203',2,'2021-02-01 17:00:00',10,5000);
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `point`
--

LOCK TABLES `point` WRITE;
/*!40000 ALTER TABLE `point` DISABLE KEYS */;
INSERT INTO `point` VALUES ('key1','abc','1','2021-11-05 00:06:47','스토어사용',100),('key2','abc','2','2021-11-05 00:06:48','구매적립',100);
/*!40000 ALTER TABLE `point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `policy`
--

LOCK TABLES `policy` WRITE;
/*!40000 ALTER TABLE `policy` DISABLE KEYS */;
INSERT INTO `policy` VALUES (1,'결제','약관 내용1'),(2,'회원가입','약관 내용2');
/*!40000 ALTER TABLE `policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `policy_agree`
--

LOCK TABLES `policy_agree` WRITE;
/*!40000 ALTER TABLE `policy_agree` DISABLE KEYS */;
INSERT INTO `policy_agree` VALUES (1,'abc'),(2,'qwe');
/*!40000 ALTER TABLE `policy_agree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'팝콘',10000,'우선 생략','맛있는 팝콘입니다','스낵'),(2,'콜라',5000,'우선 생략','시원한 콜라입니다','스낵');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `qna`
--

LOCK TABLES `qna` WRITE;
/*!40000 ALTER TABLE `qna` DISABLE KEYS */;
INSERT INTO `qna` VALUES (1,'abc','2021-11-02 09:24:32','우산을 잃어버렸어요','분홍색 우산이에요 어제 잃어버렸어요','분실물 문의',0),(2,'qwe','2021-11-17 11:24:32','10관 빌리고 싶어요','2시간 정도 빌리고 싶습니다','대관 문의',1);
/*!40000 ALTER TABLE `qna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reservation_details`
--

LOCK TABLES `reservation_details` WRITE;
/*!40000 ALTER TABLE `reservation_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reservation_history`
--

LOCK TABLES `reservation_history` WRITE;
/*!40000 ALTER TABLE `reservation_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES ('abc',1,1,5,0,'최고의 영화 마동석 귀요미','2021-11-05 00:17:09'),('qwe',2,2,4,1,'최고의 마음이 사랑해','2021-11-05 00:17:09');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `salary`
--

LOCK TABLES `salary` WRITE;
/*!40000 ALTER TABLE `salary` DISABLE KEYS */;
INSERT INTO `salary` VALUES ('A-001',200.0,50.0,224.4,'2021-11-04',1),('B-001',250.0,100.0,304.6,NULL,0);
/*!40000 ALTER TABLE `salary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES ('BU102','2021-11-21',7.0,6.0,3.0,0.5,16.2),('SE203','2021-07-12',5.0,10.0,4.0,0.8,15.4);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,2,2,'2021-11-06 11:00:00','2021-11-06 13:00:00'),(2,1,1,'2021-11-11 16:00:00','2021-11-11 18:00:00');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seats`
--

LOCK TABLES `seats` WRITE;
/*!40000 ALTER TABLE `seats` DISABLE KEYS */;
INSERT INTO `seats` VALUES (1,'1'),(2,'1');
/*!40000 ALTER TABLE `seats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES ('BU102',1,50),('SE203',2,100);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `store_order`
--

LOCK TABLES `store_order` WRITE;
/*!40000 ALTER TABLE `store_order` DISABLE KEYS */;
INSERT INTO `store_order` VALUES (1,'abc',12345,'2021-11-05 00:25:06',1),(2,'qwe',12346,'2021-11-05 00:25:06',2);
/*!40000 ALTER TABLE `store_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `theater`
--

LOCK TABLES `theater` WRITE;
/*!40000 ALTER TABLE `theater` DISABLE KEYS */;
INSERT INTO `theater` VALUES ('BU102','A극장','부산','123-1234','A극장입니다.'),('SE203','B극장','서울','456-1234','B극장입니다.');
/*!40000 ALTER TABLE `theater` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ticket_price`
--

LOCK TABLES `ticket_price` WRITE;
/*!40000 ALTER TABLE `ticket_price` DISABLE KEYS */;
INSERT INTO `ticket_price` VALUES (1,'IMAX',7000,'청소년'),(2,'키즈관',5000,'유아');
/*!40000 ALTER TABLE `ticket_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `wish`
--

LOCK TABLES `wish` WRITE;
/*!40000 ALTER TABLE `wish` DISABLE KEYS */;
INSERT INTO `wish` VALUES ('abc',1),('abc',2);
/*!40000 ALTER TABLE `wish` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-05 15:38:54
