-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Feb 21. 09:36
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
(7, 'Agora', 'A place to discuss ideas', '120 stone', '', '');

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
  `RNA` varchar(10) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `cell_evolution`
--

INSERT INTO `cell_evolution` (`id`, `Name`, `Description`, `Evolution`, `DNA`, `RNA`) VALUES
(1, 'RNA', 'A piece of genome', 0, '-', '-'),
(2, 'DNA', 'Genome', 0, '-', '-'),
(3, 'Mitochondria', 'The powerhouse of the cell', 0, '60', '40'),
(4, 'Sucker', 'its a test', 1, '20', '-'),
(5, 'Kapszaicin', 'Did you know only 13%....', 0, '-', '50');

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
  `Boost` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `First Resources` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `Second Resources` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Third Resources` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `Fourth Resources` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `researchs`
--

INSERT INTO `researchs` (`ID`, `Name`, `Description`, `Boost`, `First Resources`, `Second Resources`, `Third Resources`, `Fourth Resources`) VALUES
(1, 'Membrane', 'Thin outer layer of cell', '+_10/RNA/Storage', '20_ DNA/10_DNA', '', '', ''),
(2, 'Organelles', 'Functional cells', '+/2/RNA/sec', '30_DNA/15_DNA', '15_RNA/10_RNA', '', ''),
(3, 'Nucleus', 'Container of genome', '+/1/DNA/sec/-/2/RNA/sec', '50_DNA/15_DNA', '0_RNA/15_RNA', '', '');

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
(11, 'Gold', 'From nobility'),
(12, 'Knowledge', 'Facts or ideas acquired by study, investigation, observation, or experience '),
(13, 'Wine', 'A nice alcoholic drink made of grapes'),
(14, 'Fur', 'The still furry hide of an animal');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `resources`
--
ALTER TABLE `resources`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
