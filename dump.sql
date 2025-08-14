-- MySQL dump 10.13  Distrib 9.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: sustainx
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add country',7,'add_country'),(26,'Can change country',7,'change_country'),(27,'Can delete country',7,'delete_country'),(28,'Can view country',7,'view_country'),(29,'Can add province',8,'add_province'),(30,'Can change province',8,'change_province'),(31,'Can delete province',8,'delete_province'),(32,'Can view province',8,'view_province'),(33,'Can add SDG Goal',9,'add_sdggoal'),(34,'Can change SDG Goal',9,'change_sdggoal'),(35,'Can delete SDG Goal',9,'delete_sdggoal'),(36,'Can view SDG Goal',9,'view_sdggoal'),(37,'Can add sdg target',10,'add_sdgtarget'),(38,'Can change sdg target',10,'change_sdgtarget'),(39,'Can delete sdg target',10,'delete_sdgtarget'),(40,'Can view sdg target',10,'view_sdgtarget'),(41,'Can add sdg indicator',11,'add_sdgindicator'),(42,'Can change sdg indicator',11,'change_sdgindicator'),(43,'Can delete sdg indicator',11,'delete_sdgindicator'),(44,'Can view sdg indicator',11,'view_sdgindicator'),(45,'Can add city',12,'add_city'),(46,'Can change city',12,'change_city'),(47,'Can delete city',12,'delete_city'),(48,'Can view city',12,'view_city'),(49,'Can add admin query',13,'add_adminquery'),(50,'Can change admin query',13,'change_adminquery'),(51,'Can delete admin query',13,'delete_adminquery'),(52,'Can view admin query',13,'view_adminquery'),(53,'Can add sdg data',14,'add_sdgdata'),(54,'Can change sdg data',14,'change_sdgdata'),(55,'Can delete sdg data',14,'delete_sdgdata'),(56,'Can view sdg data',14,'view_sdgdata'),(57,'Can add sd g1',15,'add_sdg1'),(58,'Can change sd g1',15,'change_sdg1'),(59,'Can delete sd g1',15,'delete_sdg1'),(60,'Can view sd g1',15,'view_sdg1'),(61,'Can add sd g11',16,'add_sdg11'),(62,'Can change sd g11',16,'change_sdg11'),(63,'Can delete sd g11',16,'delete_sdg11'),(64,'Can view sd g11',16,'view_sdg11'),(65,'Can add sd g2',17,'add_sdg2'),(66,'Can change sd g2',17,'change_sdg2'),(67,'Can delete sd g2',17,'delete_sdg2'),(68,'Can view sd g2',17,'view_sdg2'),(69,'Can add sd g3',18,'add_sdg3'),(70,'Can change sd g3',18,'change_sdg3'),(71,'Can delete sd g3',18,'delete_sdg3'),(72,'Can view sd g3',18,'view_sdg3'),(73,'Can add sd g4',19,'add_sdg4'),(74,'Can change sd g4',19,'change_sdg4'),(75,'Can delete sd g4',19,'delete_sdg4'),(76,'Can view sd g4',19,'view_sdg4'),(77,'Can add sd g6',20,'add_sdg6'),(78,'Can change sd g6',20,'change_sdg6'),(79,'Can delete sd g6',20,'delete_sdg6'),(80,'Can view sd g6',20,'view_sdg6'),(81,'Can add sd g7',21,'add_sdg7'),(82,'Can change sd g7',21,'change_sdg7'),(83,'Can delete sd g7',21,'delete_sdg7'),(84,'Can view sd g7',21,'view_sdg7'),(85,'Can add sdg info',22,'add_sdginfo'),(86,'Can change sdg info',22,'change_sdginfo'),(87,'Can delete sdg info',22,'delete_sdginfo'),(88,'Can view sdg info',22,'view_sdginfo');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$ySsjZFNmFccJRB5W0XOldc$n0gm0yDIB4ZBkZ0169yeqcxS71XoDF7G5hC5SGRzKgc=','2025-07-28 10:43:27.946819',1,'admin','','','anilayounas41@gmail.com',1,1,'2025-06-10 22:14:53.947569');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `City_ID` int NOT NULL AUTO_INCREMENT,
  `City_Name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Province` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Urbanization_Level` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`City_ID`),
  KEY `idx_city_name` (`City_Name`),
  KEY `idx_city_province` (`Province`),
  CONSTRAINT `city_chk_1` CHECK ((`Urbanization_Level` in (_utf8mb4'Urban',_utf8mb4'Rural',_utf8mb4'Semi-Urban')))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Karachi','Sindh','Urban'),(2,'Lahore','Punjab','Urban'),(3,'Faisalabad','Punjab','Urban'),(4,'Rawalpindi','Punjab','Urban'),(5,'Multan','Punjab','Urban'),(6,'Hyderabad','Sindh','Urban'),(7,'Peshawar','KPK','Urban'),(8,'Islamabad','ICT','Urban'),(9,'Quetta','Balochistan','Urban'),(10,'Gujranwala','Punjab','Urban'),(11,'Sialkot','Punjab','Semi-Urban'),(12,'Bahawalpur','Punjab','Semi-Urban'),(13,'Sukkur','Sindh','Semi-Urban'),(14,'Larkana','Sindh','Semi-Urban'),(15,'Muzaffarabad','AJK','Rural'),(16,'Gilgit','Gilgit-Baltistan','Rural'),(17,'Chitral','KPK','Rural'),(18,'Thatta','Sindh','Rural');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(13,'sdg_app','adminquery'),(12,'sdg_app','city'),(7,'sdg_app','country'),(8,'sdg_app','province'),(15,'sdg_app','sdg1'),(16,'sdg_app','sdg11'),(17,'sdg_app','sdg2'),(18,'sdg_app','sdg3'),(19,'sdg_app','sdg4'),(20,'sdg_app','sdg6'),(21,'sdg_app','sdg7'),(14,'sdg_app','sdgdata'),(9,'sdg_app','sdggoal'),(11,'sdg_app','sdgindicator'),(22,'sdg_app','sdginfo'),(10,'sdg_app','sdgtarget'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-06-10 22:12:55.307221'),(2,'auth','0001_initial','2025-06-10 22:12:56.074870'),(3,'admin','0001_initial','2025-06-10 22:12:56.280765'),(4,'admin','0002_logentry_remove_auto_add','2025-06-10 22:12:56.291183'),(5,'admin','0003_logentry_add_action_flag_choices','2025-06-10 22:12:56.305798'),(6,'contenttypes','0002_remove_content_type_name','2025-06-10 22:12:56.457707'),(7,'auth','0002_alter_permission_name_max_length','2025-06-10 22:12:56.547482'),(8,'auth','0003_alter_user_email_max_length','2025-06-10 22:12:56.582398'),(9,'auth','0004_alter_user_username_opts','2025-06-10 22:12:56.606644'),(10,'auth','0005_alter_user_last_login_null','2025-06-10 22:12:56.703318'),(11,'auth','0006_require_contenttypes_0002','2025-06-10 22:12:56.708166'),(12,'auth','0007_alter_validators_add_error_messages','2025-06-10 22:12:56.721470'),(13,'auth','0008_alter_user_username_max_length','2025-06-10 22:12:56.821213'),(14,'auth','0009_alter_user_last_name_max_length','2025-06-10 22:12:56.912898'),(15,'auth','0010_alter_group_name_max_length','2025-06-10 22:12:56.940881'),(16,'auth','0011_update_proxy_permissions','2025-06-10 22:12:56.958564'),(17,'auth','0012_alter_user_first_name_max_length','2025-06-10 22:12:57.057844'),(18,'sdg_app','0001_initial','2025-06-10 22:12:58.227615'),(19,'sessions','0001_initial','2025-06-10 22:12:58.285745');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('294oj4vhwruubi0q6no4teqzdigvsm9b','.eJxVjDEOAiEQRe9CbQggwmBp7xnIMAOyaiBZdivj3XWTLbT9773_EhHXpcZ15DlOLM5Ci8PvlpAeuW2A79huXVJvyzwluSlyp0NeO-fnZXf_DiqO-q0B2LlgPRRkpHAsgFCoGNLagPPJqeIRjVcec1InyyokQBWA2CZiEO8P8ac4dQ:1uZAfx:DO6h4L2mgCipnLL9Rcf5M0IBaiGtgpL_brLPcNg5Rsk','2025-07-09 15:56:09.970730'),('dbdgzk89zu2zptxk1bilegg87u8r6wrz','.eJxVjMsOwiAQRf-FtSHCCBSX7v0GMswFqZo26WNl_Hdt0oVu7znnvlTidWlpncuUeqizMurwu2WWRxk2gDsPt1HLOCxTn_Wm6J3O-jqiPC-7-3fQeG7fuvPijx15kz3E1FolgIoNAEkkg1MhYkK0gI05xsquBIHAO1c7Mur9AflzOKc:1ucOy8:uAzFgYJLZFZ5gzxlvR9C9nkTeeTHxFb6wjjcFAgo3Ec','2025-07-18 13:48:16.140757'),('klrx1kjzbn5dpriba8brzclm3i378yg0','.eJxVjMsOwiAQRf-FtSHCCBSX7v0GMswFqZo26WNl_Hdt0oVu7znnvlTidWlpncuUeqizMurwu2WWRxk2gDsPt1HLOCxTn_Wm6J3O-jqiPC-7-3fQeG7fuvPijx15kz3E1FolgIoNAEkkg1MhYkK0gI05xsquBIHAO1c7Mur9AflzOKc:1uaH24:eTSzq2_BzSgP6qq4zXBhew2-v_s_2v_jfuTUl7Vupao','2025-07-12 16:55:32.624451'),('v19qp4ui51rc6457j7p3vklfl84djrup','.eJxVjMsOwiAQRf-FtSHCCBSX7v0GMswFqZo26WNl_Hdt0oVu7znnvlTidWlpncuUeqizMurwu2WWRxk2gDsPt1HLOCxTn_Wm6J3O-jqiPC-7-3fQeG7fuvPijx15kz3E1FolgIoNAEkkg1MhYkK0gI05xsquBIHAO1c7Mur9AflzOKc:1ugLM7:DnydW9bLYN_EyyAxbFAGQ7IMITdxLSG3O5WOyoWjOeQ','2025-07-29 10:45:19.425219');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sdg_1`
--

DROP TABLE IF EXISTS `sdg_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sdg_1` (
  `Poverty_ID` int NOT NULL AUTO_INCREMENT,
  `City_ID` int NOT NULL,
  `Income_Level` decimal(10,2) NOT NULL,
  `Access_to_Education` decimal(5,2) NOT NULL,
  `Social_Protection` decimal(5,2) NOT NULL,
  `Year` int NOT NULL,
  PRIMARY KEY (`Poverty_ID`),
  KEY `idx_poverty_city` (`City_ID`),
  CONSTRAINT `sdg_1_ibfk_1` FOREIGN KEY (`City_ID`) REFERENCES `city` (`City_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sdg_1`
--

LOCK TABLES `sdg_1` WRITE;
/*!40000 ALTER TABLE `sdg_1` DISABLE KEYS */;
INSERT INTO `sdg_1` VALUES (1,1,35000.00,65.20,28.50,2020),(2,2,42000.00,72.80,35.10,2021),(3,3,28000.00,58.30,22.70,2022),(4,4,38000.00,68.50,30.20,2023),(5,5,25000.00,55.10,31.12,2024),(6,6,22000.00,52.70,18.30,2020),(7,7,23000.00,53.80,19.50,2021),(8,8,50000.00,85.20,45.30,2022),(9,9,18000.00,45.60,15.20,2023),(10,10,27000.00,57.80,22.50,2024),(11,11,24000.00,56.70,21.30,2020),(12,12,20000.00,50.30,17.80,2021),(13,13,19000.00,48.20,16.70,2022),(14,14,17000.00,43.50,14.80,2023),(15,15,15000.00,40.20,12.50,2024),(16,16,16000.00,41.80,13.20,2020),(17,17,15500.00,39.70,12.80,2021),(18,18,14500.00,37.20,11.50,2022),(19,14,23.00,13.98,25.98,2022),(20,11,23.00,56.00,33.98,2021),(21,12,23.00,45.00,22.98,2021);
/*!40000 ALTER TABLE `sdg_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sdg_11`
--

DROP TABLE IF EXISTS `sdg_11`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sdg_11` (
  `Postal_Code` int NOT NULL,
  `City_ID` int NOT NULL,
  `Air_Quality_Index` decimal(5,2) NOT NULL,
  `Transport_Access` decimal(5,2) NOT NULL,
  `Infrastructure_Score` decimal(5,2) NOT NULL,
  `Year` int NOT NULL,
  PRIMARY KEY (`Postal_Code`),
  KEY `idx_cities_city` (`City_ID`),
  CONSTRAINT `sdg_11_ibfk_1` FOREIGN KEY (`City_ID`) REFERENCES `city` (`City_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sdg_11`
--

LOCK TABLES `sdg_11` WRITE;
/*!40000 ALTER TABLE `sdg_11` DISABLE KEYS */;
INSERT INTO `sdg_11` VALUES (13100,15,112.00,48.20,58.30,2024),(15100,16,98.00,46.70,55.70,2020),(17200,17,105.00,45.20,53.80,2021),(25000,7,165.00,60.50,67.20,2021),(38000,3,158.00,65.70,70.20,2022),(44000,8,120.00,78.30,85.70,2022),(46000,4,145.00,70.50,75.80,2023),(51310,11,148.00,63.50,70.50,2020),(52250,10,145.00,66.20,72.80,2024),(54000,2,142.00,72.80,78.50,2021),(60000,5,162.00,64.20,68.70,2024),(63100,12,158.00,59.30,65.80,2021),(65200,13,162.00,57.80,63.70,2022),(66020,18,118.00,43.70,52.30,2022),(71000,6,168.00,62.80,65.30,2020),(75500,1,152.00,68.50,72.30,2020),(77150,14,168.00,54.30,60.20,2023),(87300,9,175.00,55.70,62.50,2023);
/*!40000 ALTER TABLE `sdg_11` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sdg_2`
--

DROP TABLE IF EXISTS `sdg_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sdg_2` (
  `Hunger_ID` int NOT NULL AUTO_INCREMENT,
  `Health_ID` int DEFAULT NULL,
  `City_ID` int DEFAULT NULL,
  `Malnutrition_Rate` float DEFAULT NULL,
  `Food_Insecurity` float DEFAULT NULL,
  `Year` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Hunger_ID`),
  KEY `Health_ID` (`Health_ID`),
  KEY `City_ID` (`City_ID`),
  CONSTRAINT `sdg_2_ibfk_1` FOREIGN KEY (`Health_ID`) REFERENCES `sdg_3` (`Health_ID`),
  CONSTRAINT `sdg_2_ibfk_2` FOREIGN KEY (`City_ID`) REFERENCES `city` (`City_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sdg_2`
--

LOCK TABLES `sdg_2` WRITE;
/*!40000 ALTER TABLE `sdg_2` DISABLE KEYS */;
INSERT INTO `sdg_2` VALUES (1,1,1,18.5,22.3,'2020'),(2,2,2,15.2,18.7,'2021'),(3,3,3,22.7,27.5,'2022'),(4,4,4,14.8,17.8,'2023'),(5,5,5,21.3,25.2,'2024'),(6,6,6,25.8,30.1,'2020'),(7,7,7,23.5,28.3,'2021'),(8,8,8,10.5,27.99,'2022'),(9,9,9,28.7,33.5,'2023'),(10,10,10,20.5,24.7,'2024'),(11,11,11,18.7,22.8,'2020'),(12,12,12,20.2,24.1,'2021'),(13,13,13,26.3,31.2,'2022'),(14,14,14,27.8,32.5,'2023'),(15,15,15,32.1,36.8,'2024'),(16,16,16,29.5,34.2,'2020'),(17,17,17,31.8,37.5,'2021'),(18,18,18,34.2,39.8,'2022');
/*!40000 ALTER TABLE `sdg_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sdg_3`
--

DROP TABLE IF EXISTS `sdg_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sdg_3` (
  `Health_ID` int NOT NULL AUTO_INCREMENT,
  `City_ID` int NOT NULL,
  `Access_to_Healthcare` decimal(5,2) NOT NULL,
  `Maternal_Mortality` decimal(5,2) NOT NULL,
  `Vaccination_Coverage` decimal(5,2) NOT NULL,
  `Year` int NOT NULL,
  PRIMARY KEY (`Health_ID`),
  KEY `idx_health_city` (`City_ID`),
  CONSTRAINT `sdg_3_ibfk_1` FOREIGN KEY (`City_ID`) REFERENCES `city` (`City_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sdg_3`
--

LOCK TABLES `sdg_3` WRITE;
/*!40000 ALTER TABLE `sdg_3` DISABLE KEYS */;
INSERT INTO `sdg_3` VALUES (1,1,68.30,186.00,78.20,2020),(2,2,72.50,172.00,82.50,2021),(3,3,65.80,181.00,75.30,2022),(4,4,70.20,165.00,85.10,2023),(5,5,63.70,205.00,73.80,2024),(6,6,60.20,215.00,70.50,2020),(7,7,62.50,210.00,72.30,2021),(8,8,85.30,120.00,92.70,2022),(9,9,55.80,275.00,65.20,2023),(10,10,64.80,195.00,74.20,2024),(11,11,61.20,208.00,71.80,2020),(12,12,58.30,225.00,68.70,2021),(13,13,56.70,235.00,67.30,2022),(14,14,53.20,245.00,64.50,2023),(15,15,44.56,265.00,60.80,2024),(16,16,47.20,280.00,58.30,2020),(17,17,44.80,295.00,55.70,2021),(18,18,42.30,310.00,53.20,2022);
/*!40000 ALTER TABLE `sdg_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sdg_4`
--

DROP TABLE IF EXISTS `sdg_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sdg_4` (
  `Education_ID` int NOT NULL AUTO_INCREMENT,
  `City_ID` int NOT NULL,
  `Literacy_Rate` decimal(5,2) NOT NULL,
  `School_Enrollment` decimal(5,2) NOT NULL,
  `ICT_Access` decimal(5,2) NOT NULL,
  `Year` int NOT NULL,
  PRIMARY KEY (`Education_ID`),
  KEY `idx_education_city` (`City_ID`),
  CONSTRAINT `sdg_4_ibfk_1` FOREIGN KEY (`City_ID`) REFERENCES `city` (`City_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sdg_4`
--

LOCK TABLES `sdg_4` WRITE;
/*!40000 ALTER TABLE `sdg_4` DISABLE KEYS */;
INSERT INTO `sdg_4` VALUES (1,1,72.50,68.30,55.20,2020),(2,2,75.80,72.10,62.70,2021),(3,3,68.20,65.70,48.30,2022),(4,4,74.30,70.50,60.10,2023),(5,5,67.80,64.20,47.50,2024),(6,6,65.30,62.80,45.20,2020),(7,7,63.70,60.50,43.80,2021),(8,8,82.50,78.30,75.20,2022),(9,9,58.20,55.70,38.50,2023),(10,10,69.50,66.20,50.80,2024),(11,11,66.80,63.50,46.30,2020),(12,12,62.70,59.30,42.10,2021),(13,13,60.30,57.80,40.20,2022),(14,14,57.80,54.30,37.50,2023),(15,15,52.30,49.70,32.80,2024),(16,16,50.80,48.20,31.20,2020),(17,17,49.20,46.70,29.80,2021),(18,18,47.50,45.10,28.30,2022);
/*!40000 ALTER TABLE `sdg_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sdg_6`
--

DROP TABLE IF EXISTS `sdg_6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sdg_6` (
  `Water_ID` int NOT NULL AUTO_INCREMENT,
  `City_ID` int NOT NULL,
  `Health_ID` int NOT NULL,
  `Access_to_Clean_Water` decimal(5,2) NOT NULL,
  `Sanitation_Coverage` decimal(5,2) NOT NULL,
  `Year` int NOT NULL,
  PRIMARY KEY (`Water_ID`),
  UNIQUE KEY `Health_ID` (`Health_ID`),
  KEY `City_ID` (`City_ID`),
  KEY `idx_water_health` (`Health_ID`),
  CONSTRAINT `sdg_6_ibfk_1` FOREIGN KEY (`City_ID`) REFERENCES `city` (`City_ID`),
  CONSTRAINT `sdg_6_ibfk_2` FOREIGN KEY (`Health_ID`) REFERENCES `sdg_3` (`Health_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sdg_6`
--

LOCK TABLES `sdg_6` WRITE;
/*!40000 ALTER TABLE `sdg_6` DISABLE KEYS */;
INSERT INTO `sdg_6` VALUES (1,1,1,78.50,65.20,2020),(2,2,2,82.30,72.50,2021),(3,3,3,75.80,68.30,2022),(4,4,4,80.20,70.80,2023),(5,5,5,73.70,67.50,2024),(6,6,6,70.20,65.80,2020),(7,7,7,72.50,66.30,2021),(8,8,8,92.30,85.70,2022),(9,9,9,65.80,58.20,2023),(10,10,10,74.80,68.20,2024),(11,11,11,71.20,65.80,2020),(12,12,12,68.30,62.50,2021),(13,13,13,66.70,60.30,2022),(14,14,14,63.20,57.50,2023),(15,15,15,58.70,52.30,2024),(16,16,16,56.30,50.20,2020),(17,17,17,53.80,48.10,2021),(18,18,18,51.20,45.70,2022);
/*!40000 ALTER TABLE `sdg_6` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sdg_7`
--

DROP TABLE IF EXISTS `sdg_7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sdg_7` (
  `Energy_ID` int NOT NULL AUTO_INCREMENT,
  `City_ID` int NOT NULL,
  `Electricity_Access` decimal(5,2) NOT NULL,
  `Clean_Fuel_Use` decimal(5,2) NOT NULL,
  `Renewable_Energy_Share` decimal(5,2) NOT NULL,
  `Year` int NOT NULL,
  PRIMARY KEY (`Energy_ID`),
  KEY `idx_energy_city` (`City_ID`),
  CONSTRAINT `sdg_7_ibfk_1` FOREIGN KEY (`City_ID`) REFERENCES `city` (`City_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sdg_7`
--

LOCK TABLES `sdg_7` WRITE;
/*!40000 ALTER TABLE `sdg_7` DISABLE KEYS */;
INSERT INTO `sdg_7` VALUES (1,1,85.20,65.30,12.50,2020),(2,2,88.70,68.70,15.20,2021),(3,3,82.50,62.80,10.80,2022),(4,4,87.30,67.50,14.30,2023),(5,5,83.80,63.20,11.70,2024),(6,6,80.20,60.70,9.80,2020),(7,7,81.50,61.30,10.20,2021),(8,8,95.70,78.50,20.30,2022),(9,9,75.80,55.20,8.50,2023),(10,10,84.80,64.20,12.80,2024),(11,11,81.20,60.80,10.50,2020),(12,12,78.30,58.70,9.30,2021),(13,13,76.70,56.30,8.80,2022),(14,14,73.20,53.50,7.50,2023),(15,15,68.50,50.20,7.20,2024),(16,16,66.80,49.10,6.80,2020),(17,17,65.20,47.80,6.50,2021),(18,18,63.70,46.30,6.20,2022);
/*!40000 ALTER TABLE `sdg_7` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sdg_app_adminquery`
--

DROP TABLE IF EXISTS `sdg_app_adminquery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sdg_app_adminquery` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `query_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `table_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sql_query` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `affected_rows` int NOT NULL,
  `execution_time` double NOT NULL,
  `success` tinyint(1) NOT NULL,
  `error_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sdg_app_adminquery_user_id_0aabb1ba_fk_auth_user_id` (`user_id`),
  CONSTRAINT `sdg_app_adminquery_user_id_0aabb1ba_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sdg_app_adminquery`
--

LOCK TABLES `sdg_app_adminquery` WRITE;
/*!40000 ALTER TABLE `sdg_app_adminquery` DISABLE KEYS */;
/*!40000 ALTER TABLE `sdg_app_adminquery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sdg_info`
--

DROP TABLE IF EXISTS `sdg_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sdg_info` (
  `SDG_ID` int NOT NULL,
  `SDG_NAME` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DESCRIPTION` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`SDG_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sdg_info`
--

LOCK TABLES `sdg_info` WRITE;
/*!40000 ALTER TABLE `sdg_info` DISABLE KEYS */;
INSERT INTO `sdg_info` VALUES (1,'No Poverty','End poverty in all its forms everywhere.'),(2,'Zero Hunger','End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.'),(3,'Good Health and Well-being','Ensure healthy lives and promote well-being for all at all ages.'),(4,'Quality Education','Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.'),(6,'Clean Water and Sanitation','Ensure availability and sustainable management of water and sanitation for all.'),(7,'Affordable and Clean Energy','Ensure access to affordable, reliable, sustainable and modern energy for all.'),(11,'Sustainable Cities and Communities','Make cities and human settlements inclusive, safe, resilient and sustainable.');
/*!40000 ALTER TABLE `sdg_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-11 16:16:30
