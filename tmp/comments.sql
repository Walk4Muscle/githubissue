# Host: localhost  (Version: 5.5.47)
# Date: 2016-08-24 18:53:49
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "comments"
#

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `html_url` varchar(255) DEFAULT NULL,
  `issue_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `body` text,
  `has_reactions` bit(1) DEFAULT b'0',
  `total_count` int(11) DEFAULT '0',
  `vote_up` int(11) DEFAULT '0',
  `vote_down` int(11) DEFAULT '0',
  `laugh` int(11) DEFAULT '0',
  `hooray` int(11) DEFAULT '0',
  `confused` int(11) DEFAULT '0',
  `heart` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "comments"
#

/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
