# Host: localhost  (Version: 5.5.47)
# Date: 2016-08-15 01:15:45
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "organizations"
#

DROP TABLE IF EXISTS `organizations`;
CREATE TABLE `organizations` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `login` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `public_repos` tinyint(3) NOT NULL DEFAULT '0',
  `public_gists` tinyint(3) NOT NULL DEFAULT '0',
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "organizations"
#

/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (2966316,'Azure Active Directory','AzureAD','2012-12-04 23:19:57','2016-04-18 04:37:41',24,0,'');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;

#
# Structure for table "repository"
#

DROP TABLE IF EXISTS `repository`;
CREATE TABLE `repository` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `orgs_id` char(10) NOT NULL DEFAULT '',
  `name` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `size` int(10) DEFAULT NULL,
  `stargazers_count` int(10) DEFAULT NULL,
  `watchers_count` int(10) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `has_issues` bit(1) NOT NULL DEFAULT b'0',
  `forks_count` int(11) DEFAULT NULL,
  `open_issues_count` int(11) DEFAULT NULL,
  `forks` bit(1) DEFAULT NULL,
  `open_issues` int(11) DEFAULT NULL,
  `watchers` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "repository"
#

/*!40000 ALTER TABLE `repository` DISABLE KEYS */;
/*!40000 ALTER TABLE `repository` ENABLE KEYS */;
