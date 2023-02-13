-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Jan 31. 09:40
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
  `Second Resources` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `Third Resources` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `Fourth Resources` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `resources`
--

CREATE TABLE `resources` (
  `ID` int(11) NOT NULL,
  `Name` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Description` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `builted`
--
ALTER TABLE `builted`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `resources`
--
ALTER TABLE `resources`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
