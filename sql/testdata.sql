-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2018 at 12:04 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamerangers`
--

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`favourite_id`, `user_id`, `game_id`, `createdAt`, `updatedAt`) VALUES
(300, 1, 205, '2018-12-21 23:33:00', '2018-12-21 23:33:00'),
(301, 2, 207, '2018-12-21 23:35:00', '2018-12-21 23:35:00'),
(302, 3, 209, '2018-12-22 23:37:00', '2018-12-22 23:37:00'),
(303, 4, 202, '2018-12-23 23:38:00', '2018-12-23 23:38:00'),
(304, 5, 206, '2018-12-24 23:39:00', '2018-12-24 23:39:00');

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `main_image`, `title`, `release_date`, `developer`, `trailer_youtube`, `description`, `createdAt`, `updatedAt`) VALUES
(201, 'Capture1.jpg', 'Red Dead Redemption 2', '2026-10-01', 'Rockstar Games', 'https://youtu.be/v51RKn98Yf4', 'Red Dead Redemption 2 is a dissertation on art direction. It\'s the vast cowboy simulator it set out to be, turning hunting, fishing, and good ol\' fashioned robbing into their own fully-realized systems, and it does so against a beautifully-rendered backdrop of the American West', '2018-12-21 23:00:00', '2018-12-21 23:00:00'),
(202, 'Capture2.jpg', 'Celeste', '2025-01-01', 'Matt Makes Games', 'https://youtu.be/70d9irlxiB4', ' Playing as Madeline, determined to summit the mountain Celeste, your pixelated character dashes, wall jumps, and climbs through the levels of the pseudo-haunted pastel 2D world', '2018-12-21 23:10:00', '2018-12-21 23:10:00'),
(203, 'Capture3.jpg', 'God of War', '2020-04-01', 'SIE Santa Monica Studio', 'https://youtu.be/K0u_kAWLJOA', 'God of War is pinned somewhere between a hyper-realistic Norse mythology simulator and a satisfying 30-hour beat-\'em-up that turns an axe into freaking Mjolnir (y\'know, Thor\'s hammer?).', '2018-12-21 23:10:00', '2018-12-21 23:10:00'),
(204, 'Capture4.jpg', 'Marvel\'s Spider-Man', '2007-09-01', 'Insomniac Games', 'https://youtu.be/b5-_MvCWSfI', 'In Insomniac\'s world, Mary Jane is Nancy Drew; J. Jonah Jameson is Alex Jones in the flesh; and their interpretation of New York City is a heart-stopping digital playground you\'ll want to swing through for days on end.', '2018-12-21 23:20:00', '2018-12-21 23:20:00'),
(205, 'Capture5.jpg', 'Monster Hunter: World', '2026-01-01', 'Capcom', 'https://youtu.be/Ro6r15wzp2o', 'If you\'ve been itching to invest all of your foreseeable free time into an expansive sandbox world, consider Monster Hunter: World!', '2018-12-21 23:25:00', '2018-12-21 23:25:00'),
(206, 'Capture6.jpg', 'Dead Cells', '2007-08-01', 'Motion Twin', ' die', ' It\'s an action platformer that keeps you grounded and invested -- throwing you head-first into a 2D pixelated nod to Dark Souls that replaces \"serenity now\"\" with \"\"kill', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(207, 'Capture7.jpg', 'Florence', '2014-02-01', 'Mountains', 'https://youtu.be/HPUwFEhgvVA', 'Mountains\' Florence is a twee look at love and heartbreak, and how both can permanently change a person for the better.', '2018-12-21 23:30:00', '2018-12-21 23:30:00'),
(208, 'Capture8.jpg', 'Super Mario Party', '2005-10-01', 'Ndcube', 'https://youtu.be/by_XTria-mQ', 'uper Mario Party is a Toad-approved, return to form with 20 playable characters (including Pom Pom) and 80 brand new mini-games involving tricycle races', '2018-12-21 23:33:00', '2018-12-21 23:33:00'),
(209, 'Capture9.jpg', 'Shadow of the Tomb Raider', '2014-09-01', 'Crystal Dynamics', 'https://youtu.be/XYtyeqVQnRI', 'Shadow of the Tomb Raider is a magnetic leap forward from the 2013 reboot that started it all (again), but it\'s a lot more than the First Blood sequel it\'s marketed to be.', '2018-12-21 23:35:00', '2018-12-21 23:35:00'),
(210, 'Capture10.jpg', 'Octopath Traveler', '2005-06-01', 'Square Enix', 'https://youtu.be/Fmi8KrntszI', 'The Bravely Default team\'s SNES-inspired, HD-2D turn-based battler is a remarkable tribute to every JRPG ever.', '2018-12-21 23:37:00', '2018-12-21 23:37:00'),
(211, 'Capture11.jpg', 'Dragon Ball FighterZ', '2026-01-01', 'Arc System Works', 'https://youtu.be/4LRFxs1BEFk', 'PSA: Dragon Ball FighterZ is anime on bath salts. The latest entry in Akira Toriyama\'s series is a hyper-stylish 2-D fighter that sticks to its source material.', '2018-12-21 23:39:00', '2018-12-21 23:39:00'),
(212, 'Capture12.jpg', 'Shadow of the Colossus', '2006-02-01', 'Team Ico', 'https://youtu.be/RFgusTYInas', 'fight the gigantic stony colossi, ride your horse around a ruinous fantasy landscape, save the befallen maiden', '2018-12-21 23:41:00', '2018-12-21 23:41:00'),
(213, 'Capture13.jpg', 'Assassin\'s Creed Odyssey', '2005-10-01', 'Ubisoft Quebec', 'https://youtu.be/s_SJZSAtLBA', 'choose-your-own adventure that is layered with parallel storylines, naval combat, bounty hunters, cult-loving targets, BioWare-like dialogue options', '2018-12-21 23:42:00', '2018-12-21 23:42:00'),
(214, 'Capture14.jpg', 'The Messenger', '1930-08-01', ' Sabotage Studio', 'https://youtu.be/qJf9edBS0TQ', 'It\'s a 2D action-platformer that pays homage to the NES and SNES eras with superb level design, seamless animations, intricate boss fights, and a witty sense of humor that never feels forced', '2018-12-21 23:43:00', '2018-12-21 23:43:00'),
(215, 'Capture15.jpg', 'Call Of Duty: Black Ops 4', '2012-10-01', 'Treyarch', 'https://youtu.be/6kqe2ICmTxc', 'There\'s traditional multiplayer, three new modes of undead chaos for the hardcore zombie killers, and then there\'s Blackout ', '2018-12-21 23:44:00', '2018-12-21 23:44:00'),
(216, 'Capture16.jpg', ' Spyro Reignited Trilogy', '2013-11-01', 'Toys for Bob', 'https://youtu.be/ptBB5XDyw_s', 'With the Spyro Reignited Trilogy, Activision scaled up Spyro (1998), Ripto\'s Rage, and Year Of The Dragon to be fully realized worlds that were made for modern 3D adventuring.', '2018-12-21 23:45:00', '2018-12-21 23:45:00'),
(217, 'Capture17.jpg', 'Mario Tennis Aces', '2022-06-01', 'Camelot Software Planning', 'https://youtu.be/oKaUchyvPk8', 'Mario Tennis Aces revives Mario Tennis in the right way. It\'s extremely competitive, Wario is there, and Spike coughs up tennis balls while Chain Chomp somehow embodies Andre Agassi\'s prowess', '2018-12-21 23:46:00', '2018-12-21 23:46:00'),
(218, 'Capture18.jpg', 'Yakuza 6: The Song Of Life', '2017-04-01', 'SEGA', 'https://youtu.be/nyaB-yIUJIE', 'Like Yakuza 0 and the Kiwamis before it, Yakuza 6: The Song Of Life sticks to a highly specific tone and aesthetic, never letting up. ', '2018-12-21 23:47:00', '2018-12-21 23:47:00'),
(219, 'Capture19.jpg', ' Into the Breach', '2027-02-01', 'Subset Games', 'https://youtu.be/oaiFvuWsfy8', 'Take control of powerful mechs from the future in order to defeat an alien threat.', '2018-12-21 23:48:00', '2018-12-21 23:48:00'),
(220, 'Capture20.jpg', 'Donut County', '2028-08-01', 'Ben Esposito', 'https://youtu.be/NWt1GPkfzkM', 'Donut County is one of those indie anomalies that has little business being as good as it is. ', '2018-12-21 23:49:00', '2018-12-21 23:49:00'),
(221, 'Capture21.jpg', 'FIFA 19', '2018-09-28', 'EA SPORTS', 'https://youtu.be/zX0AV6yxyrQ&t=6s', 'FIFA 19 delivers a champion-caliber experience on and off the pitch. Led by the prestigious UEFA Champions League, FIFA 19 offers enhanced gameplay features that allow you to control the pitch in every moment.', '2018-12-21 23:50:00', '2018-12-21 23:50:00'),
(222, 'Capture22.jpg', 'Fortnite ', '2017-07-25', 'Epic Games', 'https://youtu.be/xlaOaHvabH0', 'Fortnite Battle Royale is a player-versus-player battle royale game for up to 100 players, allowing one to play alone, in a duo, or in a squad ', '2018-12-21 23:51:00', '2018-12-21 23:51:00');

--
-- Dumping data for table `latest_news`
--

INSERT INTO `latest_news` (`news_id`, `headline`, `content`, `createdAt`, `updatedAt`) VALUES
(29, 'Breaking News', 'Garena has announced a free coupon', '2018-12-20 23:00:00', '2018-12-02 23:22:54'),
(30, 'LATEST UPDATES', 'Free patch download available', '2018-12-20 23:02:00', '2018-12-03 13:22:54'),
(31, 'Fifa Updates', 'New update in ultimate team. Team of the Season is available', '2018-12-20 23:04:00', '2018-12-10 13:34:54'),
(32, 'Fortnite New Season', 'New season update available', '2018-12-20 23:06:00', '2018-12-10 21:22:54'),
(33, 'Call of duty updates ', 'New swason avaliable nowww!!!', '2018-12-20 23:08:00', '2018-12-24 10:53:54'),
(35, 'Christmas Eve News', 'Some content hereeeee', '2018-12-24 03:58:15', '2018-12-24 03:58:15');

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `content`, `game_id`, `user_id`, `rating`, `createdAt`, `updatedAt`) VALUES
(1, 'The game is very nice', 201, 1, 3, '2018-12-20 23:00:00', '2018-12-20 23:00:00'),
(2, 'some review text', 202, 4, 6, '2018-12-20 23:02:00', '2018-12-20 23:02:00'),
(3, 'The best game everrrrr!!!!', 202, 2, 4, '2018-12-20 23:04:00', '2018-12-20 23:04:00'),
(4, 'another review text', 211, 5, 3, '2018-12-20 23:06:00', '2018-12-20 23:06:00'),
(5, 'Omg IT IS AMAZING', 203, 3, 3, '2018-12-20 23:08:00', '2018-12-20 23:08:00'),
(6, 'Game WAS VERY LAGY :(', 204, 4, 3, '2018-12-20 23:10:00', '2018-12-20 23:10:00'),
(7, 'Really great my friend', 205, 5, 4, '2018-12-20 23:12:00', '2018-12-20 23:12:00');

--
-- Dumping data for table `search_frequency`
--

INSERT INTO `search_frequency` (`searchfreq_id`, `game_id`, `createdAt`, `updatedAt`) VALUES
(1, 205, '2018-12-21 11:10:00', '2018-12-18 17:04:44'),
(2, 205, '2018-12-21 11:11:00', '2018-12-12 00:34:00'),
(3, 202, '2018-12-21 11:11:30', '2018-12-12 06:34:00'),
(4, 210, '2018-12-21 11:11:40', '2018-12-21 11:11:40'),
(5, 213, '2018-12-21 11:12:10', '2018-12-21 11:12:10'),
(6, 203, '2018-12-21 11:12:20', '2018-12-21 11:12:20'),
(7, 209, '2018-12-21 11:12:30', '2018-12-21 11:12:30'),
(8, 201, '2018-12-21 11:12:40', '2018-12-21 11:12:40'),
(9, 203, '2018-12-21 11:12:45', '2018-12-21 11:12:45'),
(10, 208, '2018-12-21 11:12:50', '2018-12-21 11:12:50'),
(11, 217, '2018-12-21 11:12:55', '2018-12-21 11:12:55'),
(12, 218, '2018-12-21 11:13:10', '2018-12-21 11:13:10'),
(13, 209, '2018-12-21 11:13:10', '2018-12-21 11:13:10'),
(14, 207, '2018-12-21 11:15:10', '2018-12-21 11:15:10'),
(15, 222, '2018-12-21 11:15:10', '2018-12-21 11:15:10'),
(16, 217, '2018-12-21 11:15:10', '2018-12-21 11:15:10'),
(17, 215, '2018-12-21 11:16:10', '2018-12-21 11:16:10'),
(18, 212, '2018-12-21 11:17:10', '2018-12-21 11:17:10');

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'V', 'Govin', 'Govin@gmail.com', '‌ab401ac3dafb35ef18670caaf637c4999388b99a14bb9a00dd5f5dfd23eca8f0', 0, '2018-12-20 22:00:00', '2018-12-20 22:00:00'),
(2, 'John', 'Smith', 'John@gmail.com', '‌edd5579dce6d7495113b2ccc744bbccc56ea5e2af74e5acbfa80d3ba0fdde730', 0, '2018-12-20 22:10:00', '2018-12-20 22:10:00'),
(3, 'Addem', 'Ismail', 'Addem@gmail.com', '‌2d89f0c7bc57bd54afaa7f112346eaab47a53533ad2288a51cfedfaae491f4ba', 0, '2018-12-20 22:12:00', '2018-12-20 22:12:00'),
(4, 'Sally', 'Lim', 'Sally@gmail.com', '‌9d537c7a9c95eb36f5f5bf69896502920f2fde075e469cef8b7a9baec30f1f82', 0, '2018-12-20 22:15:00', '2018-12-20 22:15:00'),
(5, 'Edwin', 'Tan', 'edwin@gmail.com', '‌6be9adcb6ef7fe7bb7c4221f92fa36ea71c7d8c04de881bd1dd08ed5d48e45a7', 0, '2018-12-20 22:17:00', '2018-12-20 22:17:00'),
(6, 'Vasee', 'gharan ', 'Karan@gmail.com', '‌f7f9b95b807dff54396154f77cae082b537df747fb596456d6f02bfa7b0817c2', 0, '2018-12-20 22:19:00', '2018-12-20 22:19:00'),
(7, 'Sam ', 'lim', 'Sam@gmail.com', '‌8583d94ebbcab89c6a0f6767739cfea8cd8d4e34dc587ced52531d5b3353c586', 0, '2018-12-20 22:20:00', '2018-12-20 22:20:00'),
(8, 'Kevin', 'wong', 'Kevin@gmail.com', '‌b8080a7ef1a2ce8eed5046ce905384e38f067ab66d4dd39e596ff81a701186a3', 0, '2018-12-20 22:22:00', '2018-12-20 22:22:00'),
(9, 'Hamas', 'Bin', 'Hamas@gmail.com', '‌099610139a19c280ab8e596106a2b0641e382b3999dc6f2bb3b364ea017b2c3c', 0, '2018-12-20 22:24:00', '2018-12-20 22:24:00'),
(10, 'Shahan', 'Suresh', 'Shahan@gmail.com', '‌0ad610b5c90a9835dc3b5583971b677b0a5dafee4dcbf2432d88145e8bf057e7', 1, '2018-12-20 22:27:00', '2018-12-20 22:27:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
