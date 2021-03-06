-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: awsdb.chorl1j1nddl.ap-southeast-1.rds.amazonaws.com    Database: mydb
-- ------------------------------------------------------
-- Server version	5.6.35-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BusRoutes`
--

DROP TABLE IF EXISTS `BusRoutes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BusRoutes` (
  `routeID` int(11) NOT NULL AUTO_INCREMENT,
  `serviceNo` varchar(17) CHARACTER SET utf8 DEFAULT NULL,
  `routeNo` int(11) DEFAULT NULL,
  PRIMARY KEY (`routeID`),
  KEY `serviceNo` (`serviceNo`),
  CONSTRAINT `BusRoutes_ibfk_1` FOREIGN KEY (`serviceNo`) REFERENCES `BusServices` (`serviceNo`)
) ENGINE=InnoDB AUTO_INCREMENT=565 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BusRoutes`
--

LOCK TABLES `BusRoutes` WRITE;
/*!40000 ALTER TABLE `BusRoutes` DISABLE KEYS */;
INSERT INTO `BusRoutes` VALUES (2,'10',1),(3,'10',2),(4,'100',1),(5,'100',2),(6,'101',1),(7,'102',1),(8,'103',1),(9,'103',2),(10,'105',1),(11,'105',2),(12,'106',1),(13,'106',2),(14,'106A',1),(15,'107',1),(16,'107',2),(17,'107M',1),(18,'109',1),(19,'109',2),(20,'10e',1),(21,'10e',2),(22,'11',1),(23,'111',1),(24,'112',1),(25,'113',1),(26,'115',1),(27,'116',1),(28,'117',1),(29,'117',2),(30,'118',1),(31,'118',2),(32,'119',1),(33,'12',1),(34,'12',2),(35,'120',1),(36,'121',1),(37,'122',1),(38,'123',1),(39,'123',2),(40,'123M',1),(41,'124',1),(42,'124',2),(43,'125',1),(44,'128',1),(45,'128',2),(46,'13',1),(47,'13',2),(48,'130',1),(49,'130',2),(50,'131',1),(51,'131',2),(52,'131M',1),(53,'132',1),(54,'132',2),(55,'133',1),(56,'133',2),(57,'134',1),(58,'135',1),(59,'135A',1),(60,'136',1),(61,'136',2),(62,'138',1),(63,'139',1),(64,'139',2),(65,'139M',1),(66,'14',1),(67,'14',2),(68,'140',1),(69,'141',1),(70,'141',2),(71,'142',1),(72,'143',1),(73,'143',2),(74,'143M',1),(75,'145',1),(76,'145',2),(77,'147',1),(78,'147',2),(79,'14e',1),(80,'14e',2),(81,'15',1),(82,'150',1),(83,'151',1),(84,'151',2),(85,'151e',1),(86,'151e',2),(87,'153',1),(88,'153',2),(89,'154',1),(90,'154',2),(91,'155',1),(92,'155A',1),(93,'156',1),(94,'156',2),(95,'157',1),(96,'157',2),(97,'158',1),(98,'159',1),(99,'159',2),(100,'15A',1),(101,'16',1),(102,'16',2),(103,'160',1),(104,'161',1),(105,'161',2),(106,'162',1),(107,'162',2),(108,'162M',1),(109,'163',1),(110,'163',2),(111,'163M',1),(112,'165',1),(113,'165',2),(114,'166',1),(115,'166',2),(116,'167',1),(117,'167',2),(118,'168',1),(119,'168',2),(120,'169',1),(121,'169',2),(122,'169A',1),(123,'17',1),(124,'17',2),(125,'170',1),(126,'170',2),(127,'170A',1),(128,'170X',1),(129,'170X',2),(130,'171',1),(131,'171',2),(132,'172',1),(133,'172',2),(134,'173',1),(135,'173A',1),(136,'174',1),(137,'174',2),(138,'174e',1),(139,'174e',2),(140,'175',1),(141,'175',2),(142,'176',1),(143,'176',2),(144,'177',1),(145,'178',1),(146,'178',2),(147,'178A',1),(148,'179',1),(149,'17A',1),(150,'18',1),(151,'180',1),(152,'180A',1),(153,'181',1),(154,'181M',1),(155,'182',1),(156,'182M',1),(157,'183',1),(158,'183B',1),(159,'184',1),(160,'185',1),(161,'185',2),(162,'186',1),(163,'186',2),(164,'187',1),(165,'187',2),(166,'188',1),(167,'188',2),(168,'188E',1),(169,'188R',1),(170,'188R',2),(171,'189',1),(172,'189A',1),(173,'19',1),(174,'190',1),(175,'190',2),(176,'190A',1),(177,'191',1),(178,'192',1),(179,'192',2),(180,'193',1),(181,'193',2),(182,'194',1),(183,'195',1),(184,'196',1),(185,'196',2),(186,'196e',1),(187,'196e',2),(188,'197',1),(189,'197',2),(190,'198',1),(191,'198',2),(192,'199',1),(193,'1N',1),(194,'2',1),(195,'2',2),(196,'20',1),(197,'200',1),(198,'201',1),(199,'21',1),(200,'21',2),(201,'22',1),(202,'22',2),(203,'222',1),(204,'222B',1),(205,'225G',1),(206,'225W',1),(207,'228',1),(208,'229',1),(209,'23',1),(210,'231',1),(211,'232',1),(212,'235',1),(213,'238',1),(214,'24',1),(215,'240',1),(216,'240M',1),(217,'241',1),(218,'242',1),(219,'243G',1),(220,'243W',1),(221,'246',1),(222,'249',1),(223,'25',1),(224,'25',2),(225,'251',1),(226,'252',1),(227,'253',1),(228,'254',1),(229,'255',1),(230,'256',1),(231,'257',1),(232,'258',1),(233,'26',1),(234,'26',2),(235,'261',1),(236,'262',1),(237,'265',1),(238,'268',1),(239,'268B',1),(240,'268C',1),(241,'269',1),(242,'27',1),(243,'272',1),(244,'273',1),(245,'28',1),(246,'28',2),(247,'282',1),(248,'284',1),(249,'285',1),(250,'29',1),(251,'291',1),(252,'292',1),(253,'293',1),(254,'2N',1),(255,'3',1),(256,'3',2),(257,'30',1),(258,'30',2),(259,'300',1),(260,'301',1),(261,'302',1),(262,'302A',1),(263,'307',1),(264,'307A',1),(265,'308',1),(266,'30e',1),(267,'30e',2),(268,'31',1),(269,'31',2),(270,'315',1),(271,'317',1),(272,'32',1),(273,'32',2),(274,'324',1),(275,'325',1),(276,'33',1),(277,'33',2),(278,'333',1),(279,'334',1),(280,'335',1),(281,'33A',1),(282,'33B',1),(283,'34',1),(284,'34A',1),(285,'35',1),(286,'354',1),(287,'358',1),(288,'359',1),(289,'35M',1),(290,'36',1),(291,'36A',1),(292,'36B',1),(293,'37',1),(294,'371',1),(295,'372',1),(296,'38',1),(297,'38',2),(298,'382G',1),(299,'382W',1),(300,'386',1),(301,'39',1),(302,'39',2),(303,'3A',1),(304,'3B',1),(305,'3N',1),(306,'4',1),(307,'40',1),(308,'400',1),(309,'401',1),(310,'402',1),(311,'403',1),(312,'405',1),(313,'408',1),(314,'41',1),(315,'410G',1),(316,'410W',1),(317,'42',1),(318,'43',1),(319,'43',2),(320,'43M',1),(321,'45',1),(322,'45',2),(323,'46',1),(324,'46',2),(325,'47',1),(326,'48',1),(327,'48',2),(328,'49',1),(329,'4N',1),(330,'5',1),(331,'5',2),(332,'50',1),(333,'50',2),(334,'502',1),(335,'502A',1),(336,'506',1),(337,'506',2),(338,'51',1),(339,'51',2),(340,'513',1),(341,'513',2),(342,'518',1),(343,'518A',1),(344,'52',1),(345,'52',2),(346,'53',1),(347,'53A',1),(348,'53M',1),(349,'54',1),(350,'54',2),(351,'55',1),(352,'56',1),(353,'56',2),(354,'57',1),(355,'57',2),(356,'58',1),(357,'58',2),(358,'59',1),(359,'59',2),(360,'5N',1),(361,'6',1),(362,'60',1),(363,'61',1),(364,'61',2),(365,'62',1),(366,'62A',1),(367,'63',1),(368,'63M',1),(369,'64',1),(370,'65',1),(371,'65',2),(372,'66',1),(373,'66',2),(374,'66A',1),(375,'66B',1),(376,'66B',2),(377,'67',1),(378,'67',2),(379,'69',1),(380,'6N',1),(381,'7',1),(382,'7',2),(383,'70',1),(384,'70',2),(385,'700',1),(386,'700',2),(387,'700A',1),(388,'70M',1),(389,'72',1),(390,'72',2),(391,'73',1),(392,'74',1),(393,'74',2),(394,'74e',1),(395,'74e',2),(396,'75',1),(397,'75',2),(398,'75A',1),(399,'76',1),(400,'76',2),(401,'77',1),(402,'77',2),(403,'78',1),(404,'78A',1),(405,'79',1),(406,'79A',1),(407,'8',1),(408,'8',2),(409,'80',1),(410,'80',2),(411,'800',1),(412,'803',1),(413,'804',1),(414,'805',1),(415,'806',1),(416,'81',1),(417,'811',1),(418,'811A',1),(419,'812',1),(420,'82',1),(421,'825',1),(422,'83',1),(423,'84',1),(424,'85',1),(425,'85',2),(426,'850E',1),(427,'850E',2),(428,'851',1),(429,'851',2),(430,'852',1),(431,'852',2),(432,'853',1),(433,'853',2),(434,'853C',1),(435,'853C',2),(436,'854',1),(437,'854',2),(438,'854E',1),(439,'855',1),(440,'855',2),(441,'856',1),(442,'856',2),(443,'857',1),(444,'857A',1),(445,'858',1),(446,'858A',1),(447,'859',1),(448,'859A',1),(449,'859B',1),(450,'86',1),(451,'86',2),(452,'860',1),(453,'860A',1),(454,'868',1),(455,'87',1),(456,'87',2),(457,'88',1),(458,'88',2),(459,'882',1),(460,'882A',1),(461,'883',1),(462,'89',1),(463,'89e',1),(464,'89e',2),(465,'9',1),(466,'90',1),(467,'900',1),(468,'900A',1),(469,'901',1),(470,'902',1),(471,'903',1),(472,'904',1),(473,'91',1),(474,'911',1),(475,'912',1),(476,'912M',1),(477,'913',1),(478,'92',1),(479,'920',1),(480,'922',1),(481,'925',1),(482,'925',2),(483,'925C',1),(484,'926',1),(485,'927',1),(486,'92M',1),(487,'93',1),(488,'93',2),(489,'94',1),(490,'941',1),(491,'945',1),(492,'947',1),(493,'95',1),(494,'950',1),(495,'951E',1),(496,'951E',2),(497,'96',1),(498,'960',1),(499,'960',2),(500,'961',1),(501,'961',2),(502,'961C',1),(503,'961C',2),(504,'962',1),(505,'962B',1),(506,'962C',1),(507,'963',1),(508,'963',2),(509,'963E',1),(510,'963E',2),(511,'963R',1),(512,'963R',2),(513,'964',1),(514,'965',1),(515,'965A',1),(516,'966',1),(517,'969',1),(518,'969',2),(519,'97',1),(520,'97',2),(521,'970',1),(522,'970',2),(523,'971E',1),(524,'971E',2),(525,'972',1),(526,'972A',1),(527,'975',1),(528,'975A',1),(529,'975B',1),(530,'979',1),(531,'979M',1),(532,'97e',1),(533,'97e',2),(534,'98',1),(535,'980',1),(536,'980',2),(537,'981',1),(538,'981',2),(539,'982E',1),(540,'982E',2),(541,'983',1),(542,'985',1),(543,'985',2),(544,'98A',1),(545,'98B',1),(546,'98M',1),(547,'99',1),(548,'99',2),(549,'990',1),(550,'BPS1',1),(551,'BPS1',2),(552,'CT18',1),(553,'CT18',2),(554,'CT28',1),(555,'CT8',1),(556,'CT8',2),(557,'NR1',1),(558,'NR2',1),(559,'NR3',1),(560,'NR5',1),(561,'NR6',1),(562,'NR7',1),(563,'NR8',1),(564,'RWS8',1);
/*!40000 ALTER TABLE `BusRoutes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-06 15:13:14
