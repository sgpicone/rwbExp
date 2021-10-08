CREATE DATABASE  IF NOT EXISTS `rwbbc` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `rwbbc`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Server version	5.7.21

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
-- Table structure for table `beers`
--

DROP TABLE IF EXISTS `beers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `grouping` varchar(100) NOT NULL,
  `is_on_tap` tinyint(4) NOT NULL DEFAULT '0',
  `name` varchar(200) NOT NULL,
  `style` varchar(50) NOT NULL,
  `abv` double NOT NULL,
  `ibu` int(10) unsigned NOT NULL,
  `srm` tinyint(4) NOT NULL DEFAULT '1',
  `description` varchar(1000) NOT NULL,
  `background_color_override` varchar(6) DEFAULT NULL,
  `font_color_override` varchar(6) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `serve_size` tinyint(4) NOT NULL DEFAULT '16',
  `flavor_notes` varchar(500) DEFAULT NULL,
  `short_desc` varchar(500) DEFAULT NULL,
  `non_vegan` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beers`
--

LOCK TABLES `beers` WRITE;
/*!40000 ALTER TABLE `beers` DISABLE KEYS */;
INSERT INTO `beers` VALUES (1,'Standards',1,'Checks and Balances','IPA',7,65,7,'An East Coast IPA with a strong malt backbone paired with generous portions of Chinook, Cascade, and Willamette hops. The Founding Fathers saw the need for balance when designing our nation\'s governing bodies, implementing a three branch system. Each of these branches has the power to keep the other ones in check and prevent one branch from overpowering the system. We have used that same philosophy in forming this masterful India Pale Ale.',NULL,NULL,'2018-03-04 14:57:43','2021-04-03 16:40:28',16,'Roasted malt, hint of citrus','A traditional East Coast IPA with strong malt character and generous Chinook, Cascade and Centennial Hops. Dry Hopped with Amarillo for pleasant citrus flavor and aroma.',0),(2,'Standards',1,'Rosie\'s Red Ale','Amber Ale',6,37,16,'A Classic Red Ale with Cascade and Centennial hops. The hops help to balance the flavor, but take a back seat to caramel and munich malts. Partially inspired by Rosie the Riveter, who represented the American women working in factories and shipyards during World War II. The work done by these women was the crux of the effort to defeat fascism and promote freedom, liberty, and democracy.',NULL,NULL,'2018-03-04 14:57:43','2021-06-02 19:48:56',16,'Caramel, citrus, floral','An easy-drinking red ale with a healthy dose of standard American hops. The hop character is present, but it takes a back seat to heavy handed caramel and munich malts.',0),(3,'Standards',1,'Paul\'s Midnight Ride','Porter',4.9,30,32,'An English Porter in the traditional style, brewed with chocolate malt and East Kent Goldings hops. When Paul Revere completed his famous midnight ride in April 1775, to warn of a pending British attack, he allowed the militia to properly prepare and push back the British regulars. Thanks to his bravery, this first battle of the American Revolutionary war resulted in an American strategic victory. We imagine the militiamen celebrating with pints of ale, and we can do the same as we dedicate this beer to Paul Revere.',NULL,NULL,'2019-05-27 20:31:09','2021-01-29 20:20:14',16,'Roasted coffee, dark chocolate','A traditional porter brewed with a generous amount of dark roasted malts and balanced with East Kent Golding hops. Smooth and sessionable with distinct notes of coffee and chocolate.',0),(4,'Standards',1,'Give Me Liberty','Kolsch',5.5,40,4,'Patrick Henry spoke the words “Give me liberty, or give me death” to the 2nd Virgina Convention in an attempt to sway the vote in favor of sending troops to help fight the Revolutionary War. In a similar way, we’re serving this kolsch to show your everyday light beer drinker that craft beer isn’t all about shock and awe when it comes to flavor profile. The subtle and complex balance of malty sweetness and noble hop bitterness can be a gentle introduction into the craft world. So bring your friends down and have them tell us “Give me (a pint of) Liberty kolsch”',NULL,NULL,'2019-11-21 01:14:43','2021-08-18 21:22:32',16,'Straightforward, light & refreshing','OR GIVE ME DEATH! On second thought, a nice smooth Kolsch would be fine. Brewed with a hefty amount of German Noble Hops, this beer is surprisingly light and refreshing.',1),(5,'Rotating Taps',0,'Bunker Hill Brown','Brown Ale',5.1,30,25,'A brown ale brewed with chocolate malt and East Kent Goldings hops. Similar to Paul\'s Midnight Ride Porter, but modified for a more mellow flavor profile.',NULL,NULL,'2019-12-07 03:45:01','2021-07-27 22:30:51',16,'brown, bunkers, glorious battle','',0),(6,'Graf Series',0,'Crimson King','Amber Graf',5.5,27,17,'Inspired by Steven King\'s Dark Tower series, graf is an apple beer brewed and enjoyed in Mid World. The Crimson King is the antagonist of the series, working from the shadows to destroy Roland and his Ka-tet. This fall version of our graf uses a very similar recipe to our Rosie\'s Red Ale, but is combined in about half and half proportions with an apple base. The result is an interesting combination of apple, tartness, malt and a bit of hop bitterness.',NULL,NULL,'2019-12-07 03:46:18','2020-09-14 21:31:54',16,NULL,NULL,0),(7,'Rotating Taps',0,'Roth IPA','Rye IPA',6.2,80,11,'Invest in your taste buds with this well rounded IPA. Highlighted by Rye and Vienna Malts along with heaping doses of citrusy Amarillo Hops, Roth IPA is a delicious and interesting blend of spice, caramel and citrus.',NULL,NULL,'2019-12-07 03:47:13','2020-09-14 21:31:54',16,NULL,NULL,0),(8,'Standards',1,'Wittelsbach Loophole','Hefeweizen',4.9,11,6,'When Das Reinheitsgebot (the purity order) was put into force in Bavaria in 1516, breweries were limited to use only three ingredients in their beer: barley, hops, and water. Many spiced and fruited styles were lost during this period, however, Weissbier was able to survive due to a loophole in the law. The Dukes of Wittelsbach, the rulers of Bavaria, had a taste for Weissbier, so they decreed that a single brewery be allowed to produce it. Thanks to the dukes, we\'re able to enjoy this refreshing style today. Our version is a traditional approach using pilsen and wheat malts, and German noble hops. The specialized yeast do most of the work, producing hints of banana and clove during fermentation.',NULL,NULL,'2019-12-09 01:10:23','2021-01-29 20:20:37',16,'Light malt, cloves & banana','A traditional Bavarian Hefeweizen, brewed with wheat malt and noble hops. A refreshingly light flavor with hints of clove and banana that come from the specialized yeast used in the fermentation process.',0),(9,'Graf Series',0,'Man in Black','Stout Graf',7.8,46,36,'Inspired by Steven King\'s Dark Tower series, graf is an apple beer brewed and enjoyed in Mid World. The Man in Black is an antagonist of the series, known by many names and causing Roland trouble whenever he shows up. This winter version of our graf is stronger than the fall version, boasting a higher alcohol content and more intense flavors. It\'s beer half is a strong and dark stout, brewed with roasted barley and chocolate malts. The flavor profile consists of a strong taste of apple, followed by a bit of tartness, and finishing up with chocoate and coffee.',NULL,NULL,'2020-01-11 05:14:40','2021-01-27 22:41:49',13,NULL,NULL,0),(10,'Rotating Taps',0,'Citra SMaSH','IPA',6.5,50,6,'The first of our SMaSH Withdrawal Series. Single Malt, Single Hop beers showcase the specific contributions of the malt and hop. Maris Otter English Pale malt adds slightly sweet, biscuity notes, allowing the flavors and aromas of the hops to truly shine. A generous helping of Citra hops produces a strong tropical citrus aroma and a subtle citrus flavor. Balanced and Delicious.',NULL,NULL,'2020-02-22 16:16:25','2021-02-22 01:32:35',16,'Juicy, crisp, citrus aroma',NULL,0),(11,'Rotating Taps',0,'Nilla Nilla','Milk Stout',4.2,24,36,'Rich, sweet, and ever so slightly bitter - this milk stout has it all. Generous helpings of roasted barley and chocolate malt lend this stout its bold notes of freshly brewed coffee and dark chocolate, while a serving of lactose complements these flavors with a rich sweetness. Topped off with pure vanilla, this stout makes for a great dessert - bold, sweet, and decadent.',NULL,NULL,'2020-03-14 19:45:52','2021-02-13 04:11:02',16,NULL,NULL,1),(12,'Rotating Taps',0,'Poor Henry\'s Stout','Stout',4.5,32,36,'Named after Henry Clay, the US senator responsible for some of the most important bipartisan compromises of the mid-19th century, yet the loser of three presidential races. Neither too bitter nor too sweet, neither too light nor too heavy, it\'s a compromise worthy of the Great Compromiser himself. Dark chocolate, roasted coffee, and the delicately sweet nuttiness of Maris Otter malt all work in tandem to make you feel like the president, even if you didn\'t win.',NULL,NULL,'2020-03-14 19:45:52','2020-10-20 03:53:02',16,NULL,NULL,0),(13,'Rotating Taps',0,'Call Your M.O.M.','Pale Ale',5,40,6,'One of the earlier entries into our SMaSH Withdrawal Series. This pale ale is made solely from Maris Otter malt and Mosaic hops. The malt provides a sturdy backbone on which Mosaic\'s  bright citrus and tropical flavors can thrive. Hop forward, but not overly bitter and with a modest ABV, this pale ale is highly drinkable during any occasion.',NULL,NULL,'2020-04-04 20:53:18','2021-06-03 21:14:10',16,'Light, bright, tropical fruits & citrus','A pale ale made solely with Maris Otter malt and Mosaic hops. Hop-forward, light, and very drinkable, with bright tropical and citrus flavors and aromas but low bitterness.',0),(14,'Rotating Taps',0,'Black and Blue','Fruited Wheat',4.6,18,6,'A fruity twist on a classic German Hefeweizen, perfected from a favorite homebrew recipe. Crisp, sweet, tart and refreshing beer brewed with blueberry and blackberry purees.','AE57AA','black','2020-04-24 20:49:48','2021-08-27 21:42:56',16,'Sweet, slightly tart, flavorful',NULL,0),(15,'Limited Releases',0,'All Together','NEIPA',6.5,30,8,'Our version of the world-wide collaboration to support hospitality workers laid off during this difficult time.Our All Together is a bright, juicy, and refreshing NEIPA brewed with pale malt, oats and big ole doses of Citra, Mosaic, Simcoe and Cascade hops.  20% of all proceeds will be going to Brewery Strong.  Spearheaded by Rob Callaghan of Tuckahoe Brewing Company, Brewery Strong will accept and disburse donations for unemployed or underemployed servers throughout the state for the duration of the pandemic and beyond.',NULL,NULL,'2020-06-14 19:14:01','2020-10-20 21:25:42',16,NULL,NULL,0),(16,'Rotating Taps',1,'Summer of 76','American Wheat',6.3,19,4,'A straight-forward American Wheat. Summer of \'76 is light and refreshing with a bready malt base and just the right amount of American NorthWest Hops. This wheat beer is a fantastic summer brew.',NULL,NULL,'2020-07-10 14:25:46','2021-08-13 22:16:39',16,'Bready, light, straightforward','A straight-forward American Wheat beer with a bready base and a touch of American Northwest hops; the perfect summer brew.',0),(17,'Rotating Taps',0,'Key Lime Pale Ale','Fruited Pale Ale',6.5,22,8,'This Pale Ale is mashed with 20 pounds of crushed graham crackers and finished with 40 pounds of 100% Key Lime puree, along with hefty additions of vanilla and lactose. This easy drinking summer brew is sweet, tart and most importantly, quite delicious. Enjoy it while it lasts!',NULL,NULL,'2020-08-13 22:55:26','2021-07-10 16:16:29',13,'Tart, sweet, tangy','Brewed with crushed graham crackers and finished with 100% Key Lime puree and pure vanilla, this easy-drinking summer pale ale is sweet, tart and most importantly, quite delicious.',1),(18,'Rotating Taps',0,'Red Mill Mild','English Dark Mild',4.5,18,20,'This English Dark Mild has all of the pleasant, roasted flavors of a rich stout or porter while remaining smooth, light and refreshing enough for warmer weather drinking. It\'s the perfect drink for welcoming fall without having to say farewell to summer just yet. ',NULL,NULL,'2020-08-23 02:52:12','2020-11-09 21:50:19',16,NULL,NULL,0),(19,'Rotating Taps',0,'El Dorado','Pale Ale',5,38,5,'A pale ale showcasing the El Dorado hop variety. The pale and vienna malts take a back seat, contributing just a bit of body and sweetness. Traces of pear, watermelon, and stone fruits, on the nose, followed by subtle tropical flavors on the tongue. Light and refreshing.',NULL,NULL,'2020-09-19 14:49:56','2020-11-28 22:01:06',16,NULL,NULL,0),(20,'Rotating Taps',0,'No Longer in NE','Double IPA',7.8,41,8,'No Longer in NE is an intense, juicy, and refreshing Double IPA brewed with floor malted Maris Otter, Wheat, Caramel Malts, Oats and (TB)12 pounds of Citra, Mosaic, and El Dorado hops. A smooth fluffy mouthfeel with tropical waves of pineapple, coconut, citrus and bubblegum goes down dangerously easy. Enjoyed best while watching the great deflater struggle in Tampa.',NULL,NULL,'2020-09-26 15:59:06','2020-11-22 04:00:14',16,NULL,NULL,0),(21,'Rotating Taps',1,'Zungenbrecher Oktoberfest','Märzen',6,22,13,'The first celebration of what came to be known as Oktoberfest occurred in 1810 in Bavaria. Crown Price Ludwig married Princess Therese of Saxe-Hildburghausen, resulting in a week of festivities. Two styles of lager were served, a marzen and the lighter festbier. Our take on the traditonal marzen lager is technically an ale, but it has gone through a lagering process similar to that of our kolsch. Brewed with munich, caramel, vienna, biscuit, and aromatic malts, Zungenbrecher has a strong upfront malt character, balanced with a slight bitterness from German noble hops.',NULL,NULL,'2020-10-08 01:42:56','2021-09-18 15:51:22',16,'Malty, slightly sweet, bold','',0),(22,'Limited Releases',0,'Big Easy','Imperial Stout',8,46,40,'A smooth stout aged for 9 months. The result is a mellow blend of roasted coffee and chocolate. This stout was made from leftover wort after brewing our Graf \"Man in Black.\"',NULL,NULL,'2020-10-20 03:53:02','2021-01-27 22:41:35',13,NULL,NULL,0),(23,'Limited Releases',0,'Black is Beautiful','Imperial Stout',8,62,40,'An Imperial Stout with rich, dark chocolate character. This collaborative effort spearheaded by Weathered Souls Brewing was designed to bring awareness to the injustices that many people of color face daily and to help those that have been wronged. 100% of the proceeds of this beer will be donated to the Philadelphia Bail Fund.',NULL,NULL,'2020-10-24 15:11:57','2021-02-13 03:10:15',13,'Hearty, rich, bold','An Imperial Stout with rich, dark chocolate character. This collaborative effort spearheaded by Weathered Souls Brewing was designed to bring awareness to the injustices that many people of color face daily and to help those that have been wronged. 100% of the proceeds of this beer will be donated to the Philadelphia Bail Fund.',0),(24,'Rotating Taps',0,'Sabro Pale Ale','Pale Ale',6.2,41,7,'A pale ale showcasing the Sabro variety of hop. The pale and biscuit malts take a back seat, contributing a bit of sweetness. Experience aromas of mango, coconut, and graperfuit on the nose, followed by tropical flavors on the tongue. Light and refreshing.',NULL,NULL,'2020-11-10 23:16:51','2020-12-27 02:03:54',16,NULL,NULL,0),(25,'Limited Releases',0,'Flyin\' Hawaiian','Smoked Pale Ale',7.1,30,7,'A Small Batch Pale Ale featuring mesquite smoked malt and bountiful additions of El Dorado Hops. Look for notes of pineapple, pear, watermelon and subtle smoke.  Enjoy one last Luau before the warm weather subsides. ',NULL,NULL,'2020-11-10 23:20:13','2020-11-22 04:00:15',16,NULL,NULL,0),(26,'Rotating Taps',0,'There She Gose Again','Gose',4.5,10,3,'Gose was first brewed in the year 1000 in the town of Goslar, Germany. The style lost popularity leading up to World War II, with only one brewery producing it. That brewery was nationalised and closed by the government during the war and the style disappeared. A few small pubs tried to revive it after the war, but they pretty much stopped by 1966. It wasn\'t until the late 1990s that the style was being brewed again in Germany. In the mid 2010s Gose was introduced to the USA via California, where it quickly gained popularity and spread across the country. \n\nOur version of this 1000 year old traditional German brew is light bodied, refreshing, and effervescent. Delicious lemon tartness, with some herbal notes and a bit of saltiness. We may add some fruit to it now and again, stop by to see our current offering!',NULL,NULL,'2020-11-17 22:35:27','2021-04-29 21:03:46',16,'Light-bodied & lemon tartness','A 1000 year old traditional German brew. Light bodied, refreshing, and effervescent. Delicious lemon tartness, with some herbal notes and a bit of saltiness.',0),(27,'Rotating Taps',0,'Uncle Sam\'s','Wee Heavy',9.1,26,20,'This beer wants you to drink up! Legend has it that the iconic Uncle Sam was based on a Scottish meat packer from New York named Samuel Wilson. He supplied thousands of pounds of beef and pork during the War of 1812. Our Scottish Wee Heavy follows traditional guidelines using a Scottish water profile, floor-malted Maris Otter base malt, roasted barley, and caramel malts. This is a strong malt-dominated beer with a sweet caramel finish and little hop aroma.',NULL,NULL,'2020-11-28 17:55:56','2021-06-26 14:09:28',13,'Malty, sweet, rich','This beer wants You to drink up! Legend has it that the iconic Uncle Sam was based on a Scottish meat packer from New York named Samuel Wilson. He supplied thousands of pounds of beef and pork during the War of 1812. Our Scottish Wee Heavy follows traditional guidelines using a Scottish water profile, floor-malted Maris Otter base malt, roasted barley, and caramel malts. This is a strong malt-dominated beer with a sweet caramel finish and little hop aroma.',0),(28,'Rotating Taps',0,'Mocha Chocolata','Milk Stout',5.1,35,37,'This milk stout is reminiscent of a classic caffe mocha, with notes of roasted coffee, vanilla, cocoa and a delicate sweetness. Brewed with dark roasted malts, cocoa, vanilla and lactose, you\'ll be surprised that it doesn\'t contain a drop of coffee. Savor every sip and be carried away to an Italian cafe.',NULL,NULL,'2020-12-08 22:54:29','2021-08-11 02:13:10',16,'Roasty, chocolate, notes of coffee','This milk stout is reminiscent of a classic caffe mocha, with notes of roasted coffee, vanilla, cocoa and a delicate sweetness. Brewed with dark roasted malts, cocoa, vanilla and lactose, you\'ll be surprised that it doesn\'t contain a drop of coffee. Savor every sip and be carried away to an Italian cafe.',1),(29,'Rotating Taps',0,'Belgian Strönk','Belgian Strong',10,24,6,'Celebrate Red White & Brew\'s first anniversary with our strongest brew yet. Stronk is a traditional Belgian Golden Strong that highlights the fruity esters and spicy, complex flavors from Abbey Ale Yeasts. Well balanced with floral aroma from Golding and Saaz Hops along with a dry finish, this beer is extremely drinkable while packing a punch at a deceptive 10.0% ABV.',NULL,NULL,'2020-12-19 16:40:07','2021-03-06 16:06:46',13,'Strong, spicy, robust','Celebrate Red White & Brew\'s first anniversary with our strongest brew yet. Stronk is a traditional Belgian Golden Strong that highlights the fruity esters and spicy, complex flavors from Abbey Ale Yeasts. Well balanced with floral aroma from Golding and Saaz Hops along with a dry finish, this beer is extremely drinkable while packing a punch at a deceptive 10.0% ABV.',0),(30,'Limited Releases',0,'Stupid Sexy Flanders','Flanders Red',5,21,15,'Flanders Red is a dark, sourish ale traditionally aged for up to three years in oak casks. It originated in the north of Belgium, in the historic kingdom of Flanders. In addition to brewers yeast, fermentation of this style involves wild yeast and bacteria, which were naturally present in the aging casks. These microorganisms contribute a wide variety of flavors you wouldn\'t normally expect in beer. Our take on this classic style uses a recently available yeast that produces lactic acid as a byproduct of fermentation. It has a light body with a very forward sourness, followed by a bit of maltyness, and hints of cherry and oak.','821111',NULL,'2021-01-05 22:12:58','2021-01-13 22:52:54',16,NULL,NULL,0),(31,'Rotating Taps',0,'Slam Dunkel','Dunkelweizen',4.7,14,23,'Known as the whole-grain loaf of the beer world, dunkelweizen is the darker version of the popular hefeweizen. It is brewed with darker malts, which give it a rich color,  along with a sweetness of toffee, caramel, vanilla, or nutty flavors. Contrary to popular belief, dunkelweizen was historically the more popular brew of the two, only falling behind in the ninteenth century when technological advancements made the lighter hefeweizen easier to brew.\n\nOur take on this style uses heaps of Munich and caramel malts to give it a rich, dark color, and a sweet malty flavor. Aromas of banana and clove are noticable, but not overpowering. A well balanced beer to keep you warm during the winter months.',NULL,NULL,'2021-01-30 16:21:44','2021-05-16 22:29:04',16,'Sweet, balanced, hint of banana & clove','Our take on this style uses heaps of Munich and caramel malts to give it a rich, dark color and a sweet malty flavor. Aromas of banana and clove are noticable, but not overpowering. A well-balanced beer to keep you warm during the winter months.',0),(32,'Rotating Taps',0,'Manic Pixie Dream Ale','Sour Hazy IPA',5.8,31,9,'Dry-hopped with Citra and Mosaic hops for intense, juicy citrus flavor and aroma, fermented with Philly Sour yeast for a tart kick, and sweetened with lactose to balance it all out, our new sour, hazy, double dry-hopped, milkshake IPA (phew) is here with a free spirit and open mind to teach you how to seize the day and embrace life\'s wild adventures.',NULL,NULL,'2021-02-13 04:06:18','2021-04-01 15:47:41',13,'Bright, citrusy, juicy',NULL,1),(33,'Limited Releases',0,'It\'s Barley Wine','American Barleywine',10.25,86,13,'Strong malty flavors, but balanced more toward bitterness. Packed full of flavor from caramel malts and American Hop varietys. A bit of citrus flavor from the late addition of Amarillo hops.',NULL,NULL,'2021-03-06 16:05:29','2021-03-13 01:10:42',13,'Malty, bitter, hint of citrus','Strong malty flavors, but balanced more toward bitterness. Packed full of flavor from caramel malts and American Hop varietys. A bit of citrus flavor from the late addition of Amarillo hops.',0),(34,'Rotating Taps',0,'Blood of Cú Chulainn','Irish Red Ale',5.3,22,13,'Full-flavored and fully drinkable, our Irish red ale is brewed in the traditional fashion. Notes of caramel, molasses, and sweet malt coalesce with the slightest bite of hop bitterness to create an ale that tastes great and goes down easy.',NULL,NULL,'2021-03-13 07:20:31','2021-05-05 19:37:35',16,'Malty, caramel-sweet, slight hop bitterness',NULL,0),(35,'Rotating Taps',0,'Ich Bin Ein','Berliner Weisse',3.4,7,3,'A light and refreshing brew perfect for warmer days. Our Berliner Weisse is fermented with Philly Sour yeast and is finished with tart cherry puree to give it a slightly sour tang. Enjoy it on its own or in one of our refreshing spring shandies!',NULL,NULL,'2021-03-20 06:53:03','2021-06-24 02:52:14',16,'Light, refreshing, hints of fruit and sourness',NULL,0),(36,'Rotating Taps',1,'Peer Pressure','Hard Seltzer',6.4,0,0,'All the cool kids have a hard seltzer and now we do too! Enjoy this refreshing gluten-free hard seltzer in a variety of rotating flavors!',NULL,NULL,'2021-04-09 19:33:26','2021-10-01 19:29:56',16,'Available in Pear, Pomegranate','',0),(37,'Limited Releases',1,'Pucker Up','Fruited Sour',7.1,11,8,'A fruited sour ale fermented with Philly Sour and passionfruit and guava purees. The sweetness of the fruit balances out the tartness produced by the yeast.',NULL,NULL,'2021-05-08 15:18:20','2021-07-24 10:44:25',13,'Tart, passionfruit, guava','A fruited sour ale fermented with Philly Sour and passionfruit and guava purees. The sweetness of the fruit balances out the tartness produced by the yeast.',0),(38,'Rotating Taps',0,'There Will Be Hops','Double IPA',8,106,9,'A double IPA brewed in the west coast style with generous amounts of Simcoe, Centennial, and Citra, and finished with heaps of Simcoe and Citra for the dry hop. A strong bitterness, with notes of citrus and pine.',NULL,NULL,'2021-05-15 03:06:44','2021-07-25 18:17:04',13,'Bitter, pine, citrus',NULL,0),(39,'Rotating Taps',0,'Beat the Bounds','Spring Helles Bock Lager',6.7,27,8,'An ancient practice that is still observed in some portions of the U.K. and the NE region of the U.S., taking time to Beat the Bounds of your property is a means of giving thanks to the Earth for your bounty. Our Spring Helles Bock Lager is a malt-forward traditional German lager that is balanced with novle hops and a semi-sweet medium body. ',NULL,NULL,'2021-05-21 17:16:42','2021-07-30 20:44:49',16,'Bready, crisp, semi-sweet, slightly bitter','Our Spring Helles Bock Lager is a malt-forward traditional German lager that is balanced with novle hops and a semi-sweet medium body.',0),(40,'Limited Releases',0,'I Did It All For the Cookie','Belgian-Style Golden Ale',6.2,26,10,'From the mind of RWB\'s assistant brewer, Tracey, comes a rich, delicious, and comforting Belgian-style golden ale. Brewed with Biscoff cookies and toasted coconut, expect a smooth and enticing brew with notes of brown sugar, warm spices, and coconut - with the barest hint of warmth that will soothe and comfort you to your core.',NULL,NULL,'2021-07-04 11:54:43','2021-07-06 01:35:38',9,'Rich, decadant, sweet',NULL,1),(41,'Limited Releases',0,'My Dearest Friend','Saison',6.3,40,6,'From the mind of RWB\'s taproom supervisor, Lewis, comes a dry and incredibly refreshing summer saison brewed with rhubarb and a touch of black pepper. Let this saison woo you with its song of light, summery notes and a whisper of spice.',NULL,NULL,'2021-07-04 11:55:57','2021-07-06 01:35:44',9,'Light, tart, refreshing, hint of spice',NULL,0),(42,'Limited Releases',0,'SaisAudubon','Saison',6.3,23,6,'A farmhouse style ale with hints of ginger and orange and a bit of fermented funk from the saison yeast for added complexity. ',NULL,NULL,'2021-07-31 11:34:42','2021-08-13 22:15:24',9,'','',0),(43,'Rotating Taps',0,'Common Sense','NEIPA',6.3,32,7,'Bright, balanced, and bursting with juicy, citrus hop flavors and aromas - it just seemed like common sense that we should make this beer. Citra, Mosaic, Simcoe and Cascade hops are balanced against pale malt and flaked oats for a brew that\'s refreshing, juicy, lightly sweet and gently bitter. ',NULL,NULL,'2021-08-04 19:25:15','2021-09-24 21:34:05',13,'Bright, juicy, citrus','Bright, balanced, and bursting with juicy, citrus hop flavors and aromas - it just seemed like common sense that we should make this beer. Citra, Mosaic, Simcoe and Cascade hops are balanced against pale malt and flaked oats for a brew that\'s refreshing, juicy, lightly sweet and gently bitter. ',0),(44,'Limited Releases',0,'Wyld Stallyn','Wild Beer',6,19,6,'Brewed with a wild yeast captured and cultivated in our brew house and finished with pawpaw fruit grown locally in Tabernacle, NJ',NULL,NULL,'2021-08-24 19:27:21','2021-08-24 19:27:21',8,'Banana, tropical fruit','',0),(45,'Rotating Taps',1,'Back in Session','Session IPA',4.5,23,6,'Engineered specifically to be as crushable as possible, this New England Session IPA is light, hoppy, and incredibly refreshing. Expect notes of stone fruit and citrus, as well as a lower ABV so you can enjoy it all day long.',NULL,NULL,'2021-08-30 22:36:00','2021-09-03 19:56:54',16,'Stone fruit, light, refreshing','Engineered specifically to be as crushable as possible, this New England Session IPA is light, hoppy, and incredibly refreshing. Expect notes of stone fruit and citrus, as well as a lower ABV so you can enjoy it all day long.',0),(46,'Rotating Taps',1,'Grand Theft Lager','Bohemian Pilsner',5.3,30,4,'In 1838 in the city of Plzen, citizens dumped 36 barrels of beer they deemed \'undrinkable\' in the town square, right in front of city hall. They decided to build their own brewery to produce the quality of beer they wanted to drink. Two years later, (legend has it) a monk smuggled a sample of a bottom-fermenting lager yeast out of Bavaria. That sample eventually made its way into the hands of Plzen\'s new brewers. With the help of visiting German brewer Josef Groll they produced the first of what is now known as a Bohemian Pilsner. It is now the most imitated beer style in the world. A traditional take on the style with a small twist. Each sip starts off with a strong bitterness from the Saaz hops, which is followed up by lots of crisp pilsner malt flavor and finishes clean. Lightly dry hopped with Lemondrop.',NULL,NULL,'2021-09-08 14:38:26','2021-10-02 16:15:24',16,'Bitter, malty, clean','A traditional take on the style with a small twist. Each sip starts off with a strong bitterness from the Saaz hops, which is followed up by lots of crisp pilsner malt flavor and finishes clean. Lightly dry hopped with Lemondrop.',0),(47,'Rotating Taps',1,'Sour Wife, Sour Life','Fruited Sour',4.7,27,5,'Designed and brewed for our favorite brewery wife, Caroline, this tart cherry wheat beer is a delightfully refreshing way to end the summer. The tart cherry flavor rests on a sweet foundation of wheat, for a full bodied and crisp finish.',NULL,NULL,'2021-09-22 03:24:53','2021-09-25 16:14:24',16,'Tart, light, crisp','Designed and brewed for our favorite brewery wife, Caroline, this tart cherry wheat beer is a delightfully refreshing way to end the summer. The tart cherry flavor rests on a sweet foundation of wheat, for a full bodied and crisp finish.',0),(48,'Limited Releases',0,'Jessie\'s Ghoul','Pale Ale',6.7,32,8,'',NULL,NULL,'2021-10-02 16:15:48','2021-10-02 16:15:48',13,'','',0),(49,'Limited Releases',0,'Alternate Reality','Golden Stout ',6.7,30,7,'',NULL,NULL,'2021-10-02 16:16:26','2021-10-02 16:16:26',13,'','',1),(50,'Rotating Taps',0,'Whoops! ','Brown Ale',6.3,46,37,'',NULL,NULL,'2021-10-02 16:35:10','2021-10-06 03:18:56',16,'','',0);
/*!40000 ALTER TABLE `beers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config_data`
--

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;