-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Már 14. 08:41
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `project_civilization`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `buildable`
--

CREATE TABLE `buildable` (
  `ID` int(11) NOT NULL,
  `Building ID` int(11) NOT NULL,
  `User ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `buildings`
--

CREATE TABLE `buildings` (
  `ID` int(11) NOT NULL,
  `Name` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Description` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `First Resources` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `Second Resources` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `Third Resources` varchar(40) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `buildings`
--

INSERT INTO `buildings` (`ID`, `Name`, `Description`, `First Resources`, `Second Resources`, `Third Resources`) VALUES
(1, 'Nest', 'A basic burrow for creatures', '35 wood', '', ''),
(2, 'Bone Hoard', 'A place to hoard bones', '25 bone', '', ''),
(3, 'Stone Quarry', 'A hole to mine stone', '50 wood', '', ''),
(4, 'Hut', 'A home for your creatures', '30 wood', '20 bone', ''),
(5, 'Shed', 'A place to store materials', '100 wood', '20 stone', ''),
(6, 'Shamans Hut', 'A place of study and medicine', '100 bone', '200 stone', ''),
(7, 'Agora', 'A place to discuss ideas', '120 stone', '', ''),
(8, 'Depository', 'An impored storega place', '220 wood', '170stone', ''),
(9, 'Vinery', 'A Place to make Wine', '180 wood', '50 food', ''),
(10, 'Tavern', 'The best place to get drunk', '120stone', '', ''),
(11, 'Barrack\'s', 'A place to train soldiers', '180 wood', '150 stone', ''),
(12, 'Mine', 'A dark hole where children work', '150 wood', '', ''),
(13, 'Smelter', 'A place where true metal is made', '100 stone', '20 iron', ''),
(14, 'Market', 'The heart of any economy', '250 wood', '100 fur', ''),
(16, 'Farm', 'I nice litle field to grow plants', '500 wood', '250 fur', ''),
(17, 'Mill', 'A building to turn wheat into flour', '600 wood', '300 fur', ''),
(18, 'Guild', 'The first organized labor force', '400 wood', '300 stone', ''),
(19, 'Shool', 'A place for children to learn', '600 wood', '500 stone', ''),
(20, 'Libarie', 'A treasure trove of knowledge', '40 plywood', '50 brick', '250 fur'),
(21, 'Costum\'s depository', 'A goverment owned storage place', '800 wood', '700 stone', ''),
(22, 'Castle', 'A bastion of nobility', '500 stone', '300 wood', ''),
(23, 'Walls', 'The most basic defence of all', '250 stone', '150 wood', ''),
(24, 'Manor', 'A nice villa for nobles', '400 wood', '200 stone', ''),
(25, 'Public Bathhouse', 'A place of social gathering\'s', '400 stone', '250 wood', '150 gold'),
(26, 'Sawmill', 'It will make wood production easier', '600 wood', '300 iron', ''),
(27, 'Stone quarry', 'A mine specifically for stone', '600 wood', '300 iron', ''),
(28, 'Coal Mine', 'A place to mine coal', '75 plywood', '500 iron', '750 gold'),
(29, 'Coal Depo', 'A storage specifically for coal', '2000 wood', '1000 stone', ''),
(30, 'Warehouse', 'A large storage building', '2000 wood', '1000 stone', ''),
(31, 'University', 'The highest peak of learning', '2000 gold', '3000 wood', '2500 stone'),
(32, 'Science Labor', 'Labs for experimenting', '15000 gold', '3000 steel', '1500 concrete'),
(33, 'Journalist Office', 'A den of vultures who would sell their mother for a story', '2500 gold', '100 plywood', '75 brick'),
(34, 'Police', 'A totaly uncorruptable force of justice', '2500 wood', '2000 stone', '500 steel'),
(35, 'Railway Lines', 'The first to toward globalization', '2000 gold', '600 steel', '5000 wood'),
(36, 'Embassy', 'The gathering of the most vile and repulsive creatures...Politicians', '25000 gold', '5000 steel', '1000 concrete'),
(37, 'Factory', 'A place to make product faster and easyer', '5000 gold', '2000 steel', '10000 wood'),
(38, 'Industrial Zone', 'A gathering of different factorys', '20000 gold', '2500 steel', '500 concrete'),
(39, 'Coal Powerplant', 'The most basic powerplan not realy ECO friendly', '7500 gold', '2500 steel', '250 concrete'),
(40, 'Steam Machine factory', 'This factory makes steam machines', '25000 gold', '5000 steel', '1000 concrete');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `builted`
--

CREATE TABLE `builted` (
  `ID` int(11) NOT NULL,
  `Building ID` int(11) NOT NULL,
  `User ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cell evolution by user`
--

CREATE TABLE `cell evolution by user` (
  `id` int(11) NOT NULL,
  `evolution id` int(11) NOT NULL,
  `user id` int(11) NOT NULL,
  `Evolution` tinyint(4) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cell_evolution`
--

CREATE TABLE `cell_evolution` (
  `id` int(11) NOT NULL,
  `Name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `Description` varchar(80) COLLATE utf8_hungarian_ci NOT NULL,
  `Evolution` tinyint(4) NOT NULL,
  `DNA` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `RNA` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `storage` tinyint(1) NOT NULL,
  `producer` tinyint(1) NOT NULL,
  `DNAplus` int(11) NOT NULL,
  `RNAplus` int(11) NOT NULL,
  `DNA_increament` int(11) NOT NULL,
  `RNA_Increament` int(11) NOT NULL,
  `RNA_Decrament` int(11) NOT NULL,
  `storageRNAplus` int(11) NOT NULL,
  `storageDNAplus` int(11) NOT NULL,
  `Species` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `cell_evolution`
--

INSERT INTO `cell_evolution` (`id`, `Name`, `Description`, `Evolution`, `DNA`, `RNA`, `storage`, `producer`, `DNAplus`, `RNAplus`, `DNA_increament`, `RNA_Increament`, `RNA_Decrament`, `storageRNAplus`, `storageDNAplus`, `Species`) VALUES
(1, 'RNA', 'A piece of genome', 0, '0', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 'DNA', 'Genome', 0, '0', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(3, 'Membrane', 'Cell barrier', 0, '20', '0', 1, 0, 10, 0, 0, 0, 0, 10, 0, 0),
(4, 'Organelles', 'Specified subunit of cell', 0, '30', '15', 0, 1, 15, 10, 0, 2, 0, 0, 0, 0),
(5, 'Nucleus', 'Contain cromosomes', 0, '50', '0', 0, 1, 15, 15, 1, 0, 2, 0, 0, 0),
(6, 'Eukaryotic cell', 'Basis of multicellular organism', 0, '50', '45', 1, 0, 15, 15, 0, 0, 0, 0, 10, 0),
(7, 'Mitochondria', 'Generate chemical energy', 0, '75', '55', 1, 0, 25, 15, 0, 0, 0, 10, 10, 0),
(8, 'Sexual reproduction', 'The cell will reproduct themself with sexual way', 1, '130', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 'Multicellural', 'Evolve to multicell orgasm', 1, '160', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(10, 'Phagocytocis', 'Cellular process for ingesting and eliminating particles(Animal species)', 1, '175', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
(11, 'Ligth bones', 'Evolve bones to be lighter(Avian specie)', 1, '200', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 2),
(12, 'Spine', 'Bones and nerves that transport inpulses within the body(Mammal specie)', 1, '200', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 3),
(13, 'Cold blood', 'Develop cold blood to survive colder places(Reptilian specie)', 1, '200', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 4),
(14, 'Chitin', 'Harden the outer cell toward high density material(Arachnid specie)', 1, '200', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 5),
(15, 'Swim bladder', 'flexible-walled, gas-filled sac(Aquatic specie)', 1, '200', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 6),
(16, 'Cloroplasts', 'plant cell organelles that convert light energy into relatively stable chemical ', 1, '175', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 7),
(17, 'Mycelium', 'Network of fungal threads or hyphae(Fungi specie)', 1, '175', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 8),
(18, 'Scierites', 'Produce stonelike cells to protect the orgasm(Lithoid specie)', 1, '175', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 9),
(19, 'Biliteral symmetry', 'Make the orgasm to biliteral symmetry', 1, '230', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(20, 'Poikilohydric', 'Ability to maintain and/or regulate water content', 1, '230', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(21, 'Spores', 'Make spores to spread trought air', 1, '230', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(22, 'Rock formation', 'Make a functional body from rock', 1, '230', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(23, 'Eggshell', 'Produce a globe form by hardened calcium carbonate', 1, '260', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(24, 'Milk', 'Produce high fat content fluid', 1, '260', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(25, 'Exoskeleton', 'hardened skeleton that protect nerves', 1, '260', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(26, 'Soft eggs', 'Produce eggs that easy to catch', 1, '260', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(27, 'Gills', 'Develop organ that exploit oxygen from liquid', 1, '260', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(28, 'Bryophite', 'Moist habitats that can survive in drier environments', 1, '260', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(29, 'Crystalization', 'Make crystals to storage energy', 1, '260', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(30, 'Sentience', 'Become a sentient specie', 1, '300', '0', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cell_evolution_by_user`
--

CREATE TABLE `cell_evolution_by_user` (
  `id` int(11) NOT NULL,
  `evolution id` int(11) NOT NULL,
  `user id` int(11) NOT NULL,
  `Evolution` tinyint(4) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `government`
--

CREATE TABLE `government` (
  `ID` int(11) NOT NULL,
  `Name` varchar(25) COLLATE utf8_hungarian_ci NOT NULL,
  `Description` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `Bonus` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Penalty` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `government`
--

INSERT INTO `government` (`ID`, `Name`, `Description`, `Bonus`, `Penalty`) VALUES
(1, 'Democracy', 'The people elect the leader', 'Moralle +10%, Moralle per job + 1%', 'Military strength -10%'),
(2, 'Autocracy', 'The leader elect himself', 'Military strength +10%', 'Moralle -10%, Moralle per job -1%'),
(3, 'Oligarchy', 'Companies rule the nation', 'Money +15%', 'Moralle -10%, Moralle per job -1%'),
(4, 'Theocracy', 'The religion rule the nation', 'Military strength +10%', 'Research per job -10%'),
(5, 'Kingdom', 'One king rule', 'Deffensive buildings cost -10%, food +10%', 'Moralle -15%');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `military`
--

CREATE TABLE `military` (
  `ID` int(11) NOT NULL,
  `Required Tech` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `User ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `opponent by user`
--

CREATE TABLE `opponent by user` (
  `ID` int(11) NOT NULL,
  `Opponent ID` int(11) NOT NULL,
  `User ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `opponents`
--

CREATE TABLE `opponents` (
  `ID` int(11) NOT NULL,
  `Name` int(11) NOT NULL,
  `Strength` int(11) NOT NULL,
  `Economy` int(11) NOT NULL,
  `Relation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `researched techs`
--

CREATE TABLE `researched techs` (
  `ID` int(11) NOT NULL,
  `Researched By` int(11) NOT NULL,
  `Research ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `researchs`
--

CREATE TABLE `researchs` (
  `ID` int(11) NOT NULL,
  `Name` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Description` varchar(200) COLLATE utf8_hungarian_ci NOT NULL,
  `First Resources` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `Second Resources` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Third Resources` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Fourth Resources` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `passive` tinyint(1) NOT NULL,
  `passive_bonus` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `tech_req` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `researchs`
--

INSERT INTO `researchs` (`ID`, `Name`, `Description`, `First Resources`, `Second Resources`, `Third Resources`, `Fourth Resources`, `passive`, `passive_bonus`, `tech_req`) VALUES
(4, 'Bonfire', 'The first step towards the stars', '100 wood', '', '', '', 1, '0.5 knowledge', ''),
(5, 'Housing', 'A place for people to live', '10 wood', '20 knowledge', '', '', 0, '', 'Bonfire'),
(6, 'Bone Tools', 'Tools made of bones', '50 bones', '25 knowledge', '', '', 0, '', 'Bonfire'),
(7, 'Sun Dial', 'A tool to tell the time', '20 stone', '20 knowledge', '', '', 1, '0.5 knowledge', 'Bonfire'),
(8, 'Basic Storage', 'A basic shed to store materials', '100 wood', '50 bones', '20 stone', '20 knowledge', 0, '', 'Bonfire'),
(9, 'Stone tools', 'Tools made of stone', '200 wood', '50 stone', '30 knowledge', '', 0, '', 'Bone Tools'),
(10, 'Iron mining', 'Figure out how to mine iron', '100 stone', '50 knowledge', '', '', 0, '', 'Stone Tools'),
(11, 'Shamans', 'The first healers/wise man\'s', '50 knowledge', '', '', '', 0, '', 'Sun dial'),
(12, 'Religion', 'The belief of something  greater than you', '100 knowledge', '', '', '', 0, '', 'Shamans'),
(13, 'Iron Refining', 'Now you can make better iron', '100 knowledge', '30 iron', '100 stone', '', 0, '', 'Religion/Iron mining'),
(14, 'Wheel', 'The idea that makes the world go', '60 stone', '120 knowledge', '', '', 1, '1.1 all', 'Iron refining'),
(15, 'Depo', 'An upgraded storage house', '125 knowledge', '', '', '', 0, '', 'Wheel'),
(16, 'Barracks', 'The home of the soldiers', '180 knowledge', '3 people', '', '', 0, '', 'Depo'),
(17, 'Wine Distilling', 'The art of Wine making', '40 knowledge', '', '', '', 0, '', 'Iron refining'),
(18, 'Writing', 'The first form to remember history', '50 knowledge', '', '', '', 0, '', 'Iron refining'),
(19, 'Iron tools', 'Sturdier tools made of iron', '150 knowledge', '30 iron', '', '', 1, '1.5 gathering', 'Writing'),
(20, 'Iron weapons', 'Strong weapons made of iron', '180 knowledge', '200 wood', '50 iron', '', 1, '2 strength', 'Barracks/Iron tools'),
(21, 'Bronze armor', 'Heavy armor to protect our soldiers', '250 knowledge', '130 furs', '50 bronze', '', 1, ' 2 defense', 'Iron weapons'),
(22, 'Smelting', 'The art of fusing metals togheter', '180 knowledge', '250 stone', '50 iron', '', 0, '', 'Iron tools'),
(23, 'Copper mining', 'Mine copper for smelting', '240 knowledge', '', '', '', 1, '0.4 copper', 'Smelting'),
(24, 'Tin mining', 'Mine tin for smelting', '240 knowledge', '', '', '', 1, '0.4 lead', 'Smelting'),
(25, 'Market', 'The heart of the commercial life', '300 knowledge', '50 bronze', '', '', 0, '', 'Copper mining/Lead mining'),
(26, 'Ancient Wonders', 'Build a wonder so in the future aliens can get the credit for it', '400 knowledge', '100 bronze', '250 furs', '', 0, '', 'Market/Barracks/Bronze Armor'),
(27, 'Feudalism', 'Take a step towards the middle ages', '500 knowledge', '500 wood', '100 bronze', '250 furs', 0, '', 'Ancient Wonders'),
(28, 'Guilds', 'A union of craftsman to regulate their craft', '600 knowledge', '200 bronze', '', '', 0, '', 'Feudalism'),
(29, 'Shools', 'Children can learn about the world here', '800 knowledge', '100 gold', '300 furs', '', 0, '', 'Guilds'),
(30, 'Books', 'Paper bound togheter by leather', '1400 knowledge', '300 gold', '400 furs', '', 0, '', 'Schools'),
(31, 'Candles', 'You no longer need a torch to light your rooms', '1700 knowledge', '500 gold', '', '', 0, '', 'Books'),
(32, 'Coinage', 'You no longer barter trade you can use gold now', '780 knowledge', '250 gold', '', '', 0, '', 'Guilds'),
(33, 'Customs', 'A govermental agency to help the people', '1450 knowledge', '500 gold', '300 furs', '700 wood', 0, '', 'Coinage'),
(34, 'Custom offices', 'More office positons for the goverment', '1750 knowledge', '500 gold', '1000 wood', '800 stone', 0, '', 'Customs'),
(35, 'Castles', 'The bastions of nobility', '600 knowledge', '500 stone', '', '', 0, '', 'Feudalism'),
(36, 'Walls', 'A simple stone wall for defense', '750 knowledge', '600 stone', '', '', 0, '', 'Castles'),
(37, 'Chain Armor', 'A strong armor made of chain links', '1500 knowledge', '500 iron', '400 gold', '', 1, '3 defense', 'Walls'),
(38, 'Military tactics', 'A grand battle demands a grand plan', '1800 knowledge', '750 gold', '', '', 1, '6 streght', 'Chain Armor'),
(39, 'Manors', 'The wealthy lives here', '600 knowledge', '200 bronze', '', '', 1, '1000 goldcap', 'Feudalism'),
(40, 'Public baths', 'A bathhouse for the common man', '775 knowledge', '200 gold', '', '', 0, '', 'Manors'),
(41, 'Mills', 'The technice to turn wheat to flour', '775 knowledge', '200 gold', '500 wood', '250 furs', 0, '', 'Manors'),
(42, 'Stone quarries', 'Now its not just a hole to mine its a organized operation', '1450 knowledge', '300 gold', '800 wood', '', 0, '', 'Mills'),
(43, 'Sawmills', 'Now you can better process wood', '1450 knowledge', '400 iron', '500 wood', '', 0, '', 'Mills'),
(44, 'Coal mining', 'The ideal place for children', '2500 knowledge', '2000 gold', '1500 iron', '', 0, '', 'Sawmills/Military tactics/Custom offices/Candles'),
(45, 'Universities', 'The highest education one can get', '2750 knowldege', '1000 gold', '600 furs', '', 0, '', 'Coal mining'),
(46, 'Press', 'With this office you can make books faster', '4000 knowledge', '1200 furs', '', '', 1, '100 knowledgecap', 'Universities'),
(47, 'Media', 'An agency that supposed to inform the public', '4000 knowledge', '2000 gold', '', '', 0, '', 'Universities'),
(48, 'Police Offices', 'The agency thats keeps ordern in cities', '5500 knowledge', '4000 gold', '2000 iron', '', 0, '', 'Press/Media'),
(49, 'Coal depo', 'Storage specifically for coal', '2500 knowledge', '250 coal', '', '', 0, '', 'Coal mining'),
(50, 'Mine shaft', 'Increased stability for deeper mining', '4500 knowledge', '1500 gold', '4000 wood', '500 steel', 1, '25 mineing', 'Coal depo'),
(51, 'Wires', 'Thin copper lines strung togheter', '1600 knowledge', '1000 copper', '', '', 0, '', 'Coal mining'),
(52, 'Steel', 'One of the strongest materials on Earth', '2750 knowledge', '500 coal', '1000 iron', '', 1, '+0.3steel ,-0.5coal,-1iron', 'Coal mining'),
(53, 'Steam machines', 'Start automatization with these steam powered machines', '4800 knowledge', '500 steel', '1500 copper', '', 0, '', 'Wires/Steel'),
(54, 'Locomotives', 'Its a train thats it', '5000 knowledge', '500 steel', '800 coal', '', 0, '', 'Steam machines'),
(55, 'Trade unions', 'The first step to globalize trading', '6500 knowledge', '6000 gold', '', '', 0, '', 'Locomotives'),
(56, 'Rivalize', 'Select a nation to choose as your rival', '6500 knowledge', '6000 gold', '', '', 0, '', 'Locomotives'),
(57, 'Diplomacy', 'Lets talk out our problems', '8500 knowledge', '10000 gold', '5000 furs', '', 0, '', 'Trade unions/Rivalize'),
(58, 'Factories', 'An automated factory', '5250 knowledge', '500 steel', '200 brick', '800 coal', 0, '', 'Steam machines'),
(59, 'Coal powerplant', 'Make electricity with burning coal', '7000 knowledge', '8000 gold', '2500 copper', '', 0, '', 'Factories'),
(60, 'Public lighting', 'Illuminate the streets using the power of electricity', '9000 knowledge', '15000 gold', '2000 steel', '', 1, '+3000 storage', 'Coal powerplants'),
(61, 'Warehouses', 'A bigger safet storage for your resources', '12000 knowledge', '20000 steel', '1250 concrete', '', 0, '', 'Public lighting'),
(62, 'Industrial zones', 'Group your industry for easier management', '10000 knowledge', '20000 gold', '2000 steel', '1000 concrete', 0, '', 'Coal powerplants'),
(63, 'Boilers', 'Heat up water with electricity', '5500 knowledge', '1000 steel', '3000 gold', '', 1, '+5 productivity', 'Steam machines'),
(64, 'Steam machinery', 'Make more machines in this factory', '7000 knowledge', '8000 gold', '2000 steel', '2500 coal', 0, '', 'Factories'),
(65, 'Science labors', 'Resarch new thechnologies here', '15000 knowledge', '25000 gold', '1500 concrete', '', 0, '', 'Industrial zones/Steam machinery'),
(66, 'Electronics', 'Force a crystal to do math for you', '25000 knowledge', '10000 copper', '30000 gold', '', 0, '', 'Police offices/Diplomacy/Warehouses/Science labors');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `resources`
--

CREATE TABLE `resources` (
  `ID` int(11) NOT NULL,
  `Name` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Description` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `resources`
--

INSERT INTO `resources` (`ID`, `Name`, `Description`) VALUES
(1, 'RNA', 'Chain of ribonucleic'),
(2, 'DNA', 'Contains genome'),
(3, 'Food', 'Proteins'),
(4, 'Bone', 'Hardened calcium'),
(5, 'Lumber', 'Hard wood'),
(6, 'Stone', 'Stones'),
(7, 'Iron', 'Iron ore'),
(8, 'Copper', 'Copper ore'),
(9, 'Tin', 'Tin ore'),
(10, 'Bronze bar', 'Bar from tin and copper ore'),
(11, 'Gold', 'From nobility');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `resources by user`
--

CREATE TABLE `resources by user` (
  `ID` int(11) NOT NULL,
  `Resource ID` int(11) NOT NULL,
  `User ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `resources_by_user`
--

CREATE TABLE `resources_by_user` (
  `ID` int(11) NOT NULL,
  `ResourceID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `resources_by_user`
--

INSERT INTO `resources_by_user` (`ID`, `ResourceID`, `UserID`, `Quantity`) VALUES
(1, 1, 1, 0),
(2, 2, 1, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Password` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `Email` varchar(40) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `Username`, `Password`, `Email`) VALUES
(1, 'Admin', '7af2d10b73ab7cd8f603937f7697cb5fe432c7ff', 'Admin@Civilization.civ');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `buildable`
--
ALTER TABLE `buildable`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `builted`
--
ALTER TABLE `builted`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `cell evolution by user`
--
ALTER TABLE `cell evolution by user`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `cell_evolution`
--
ALTER TABLE `cell_evolution`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `cell_evolution_by_user`
--
ALTER TABLE `cell_evolution_by_user`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `government`
--
ALTER TABLE `government`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `military`
--
ALTER TABLE `military`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `opponent by user`
--
ALTER TABLE `opponent by user`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `opponents`
--
ALTER TABLE `opponents`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `researchs`
--
ALTER TABLE `researchs`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `resources by user`
--
ALTER TABLE `resources by user`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `resources_by_user`
--
ALTER TABLE `resources_by_user`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `buildable`
--
ALTER TABLE `buildable`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `buildings`
--
ALTER TABLE `buildings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT a táblához `builted`
--
ALTER TABLE `builted`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `cell evolution by user`
--
ALTER TABLE `cell evolution by user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `cell_evolution`
--
ALTER TABLE `cell_evolution`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT a táblához `cell_evolution_by_user`
--
ALTER TABLE `cell_evolution_by_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `government`
--
ALTER TABLE `government`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `military`
--
ALTER TABLE `military`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `opponent by user`
--
ALTER TABLE `opponent by user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `opponents`
--
ALTER TABLE `opponents`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `researchs`
--
ALTER TABLE `researchs`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT a táblához `resources`
--
ALTER TABLE `resources`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `resources_by_user`
--
ALTER TABLE `resources_by_user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
