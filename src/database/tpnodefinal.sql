-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-10-2024 a las 21:44:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tpnodefinal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deletedpayments`
--

CREATE TABLE `deletedpayments` (
  `id` int(11) NOT NULL,
  `paymentId` int(11) NOT NULL,
  `eliminadoPor` int(11) NOT NULL,
  `FechaEliminado` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logins`
--

CREATE TABLE `logins` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `loginTime` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `logins`
--

INSERT INTO `logins` (`id`, `userId`, `loginTime`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2024-09-30 19:07:30', '2024-09-30 19:07:30', '2024-09-30 19:07:30'),
(2, 2, '2024-09-30 19:38:26', '2024-09-30 19:38:26', '2024-09-30 19:38:26'),
(3, 3, '2024-09-30 19:55:36', '2024-09-30 19:55:36', '2024-09-30 19:55:36'),
(4, 5, '2024-09-30 19:59:33', '2024-09-30 19:59:33', '2024-09-30 19:59:33'),
(5, 5, '2024-09-30 19:59:51', '2024-09-30 19:59:51', '2024-09-30 19:59:51'),
(6, 6, '2024-09-30 20:02:17', '2024-09-30 20:02:17', '2024-09-30 20:02:17'),
(7, 6, '2024-09-30 23:42:30', '2024-09-30 23:42:30', '2024-09-30 23:42:30'),
(8, 6, '2024-09-30 23:48:27', '2024-09-30 23:48:27', '2024-09-30 23:48:27'),
(9, 6, '2024-09-30 23:54:34', '2024-09-30 23:54:34', '2024-09-30 23:54:34'),
(10, 6, '2024-10-01 00:00:03', '2024-10-01 00:00:03', '2024-10-01 00:00:03'),
(11, 6, '2024-10-01 00:48:16', '2024-10-01 00:48:16', '2024-10-01 00:48:16'),
(12, 6, '2024-10-01 00:56:24', '2024-10-01 00:56:24', '2024-10-01 00:56:24'),
(13, 6, '2024-10-01 05:45:22', '2024-10-01 05:45:22', '2024-10-01 05:45:22'),
(14, 6, '2024-10-01 06:11:22', '2024-10-01 06:11:22', '2024-10-01 06:11:22'),
(15, 14, '2024-10-01 06:16:37', '2024-10-01 06:16:37', '2024-10-01 06:16:37'),
(16, 15, '2024-10-01 06:19:51', '2024-10-01 06:19:51', '2024-10-01 06:19:51'),
(17, 6, '2024-10-01 06:23:52', '2024-10-01 06:23:52', '2024-10-01 06:23:52'),
(18, 6, '2024-10-01 06:26:36', '2024-10-01 06:26:36', '2024-10-01 06:26:36'),
(19, 6, '2024-10-01 06:30:57', '2024-10-01 06:30:57', '2024-10-01 06:30:57'),
(20, 6, '2024-10-01 06:32:11', '2024-10-01 06:32:11', '2024-10-01 06:32:11'),
(21, 6, '2024-10-01 18:56:06', '2024-10-01 18:56:06', '2024-10-01 18:56:06'),
(22, 6, '2024-10-01 18:57:09', '2024-10-01 18:57:09', '2024-10-01 18:57:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `fechaPago` datetime NOT NULL,
  `fechaCarga` datetime DEFAULT NULL,
  `monto` decimal(10,2) NOT NULL,
  `formaPago` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `fechaEliminado` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `payments`
--

INSERT INTO `payments` (`id`, `fechaPago`, `fechaCarga`, `monto`, `formaPago`, `descripcion`, `ubicacion`, `activo`, `fechaEliminado`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, '2024-10-01 00:00:00', '2024-09-30 20:00:40', 150.00, 'Transferencia', 'Pago actualizado', '/path/to/updated_document.pdf', 0, NULL, '2024-09-30 20:00:40', '2024-10-01 00:56:25', 5),
(2, '2024-09-28 00:00:00', '2024-09-30 20:02:17', 100.00, 'Tarjeta', 'Pago de prueba', '/path/to/document.pdf', 1, NULL, '2024-09-30 20:02:17', '2024-09-30 20:02:17', 5),
(3, '2024-09-28 00:00:00', '2024-09-30 23:41:30', 100.00, 'Tarjeta', 'Pago de prueba', '/path/to/document.pdf', 1, NULL, '2024-09-30 23:41:30', '2024-09-30 23:41:30', 5),
(4, '2024-09-28 00:00:00', '2024-09-30 23:47:27', 100.00, 'Tarjeta', 'Pago de prueba', '/path/to/document.pdf', 1, NULL, '2024-09-30 23:47:27', '2024-09-30 23:47:27', 5),
(5, '2024-09-28 00:00:00', '2024-09-30 23:53:34', 100.00, 'Tarjeta', 'Pago de prueba', '/path/to/document.pdf', 1, NULL, '2024-09-30 23:53:34', '2024-09-30 23:53:34', 5),
(6, '2024-09-28 00:00:00', '2024-09-30 23:59:03', 100.00, 'Tarjeta', 'Pago de prueba', '/path/to/document.pdf', 1, NULL, '2024-09-30 23:59:03', '2024-09-30 23:59:03', 5),
(7, '2024-09-28 00:00:00', '2024-10-01 00:47:16', 100.00, 'Tarjeta', 'Pago de prueba', '/path/to/document.pdf', 1, NULL, '2024-10-01 00:47:16', '2024-10-01 00:47:16', 5),
(8, '2024-09-28 00:00:00', '2024-10-01 00:56:25', 100.00, 'Tarjeta', 'Pago de prueba', '/path/to/document.pdf', 1, NULL, '2024-10-01 00:56:25', '2024-10-01 00:56:25', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol` enum('super','admin','usuario') DEFAULT 'usuario',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `correo`, `contraseña`, `rol`, `createdAt`, `updatedAt`) VALUES
(1, 'Juan Perez', 'juanperez@example.com', '$2b$10$bwleVU81u1AUBE3imTyD8e717eMQ8EThOiEHEt3fbG5WVtyDRMX1q', 'usuario', '2024-09-30 19:03:46', '2024-09-30 19:03:46'),
(2, 'Eugenia1', 'laeuge1@gmail.com', '$2b$10$6TUrs28XODUKfc7y6VldK.Euxp.1pvQavGLHlPCG07r3UMPOHQToe', 'usuario', '2024-09-30 19:31:44', '2024-09-30 19:31:44'),
(3, 'Eugenia2', 'laeuge2@gmail.com', '$2b$10$cAalj6jab6ZK3zrGnp4K5.CAUhxmNqkx0lrpMwQjmHiN0xEl9lid.', 'usuario', '2024-09-30 19:55:05', '2024-09-30 19:55:05'),
(5, 'Eugenia3', 'laeuge3@gmail.com', '$2b$10$7nkUZadsTn0vCPCWe/At2.wfLJP6x8M9hO9hhkUDZvFnq15lWxq9G', 'admin', '2024-09-30 19:57:56', '2024-09-30 19:57:56'),
(6, 'Test User', 'test@example.com', '$2b$10$mD/6vFZPGrGian7graVHbe9r4Ds2yFKFQTbPj4nFO58ekG3LlvEeK', 'usuario', '2024-09-30 20:02:17', '2024-09-30 20:02:17'),
(14, 'Eugenia10', 'laeuge10@gmail.com', '$2b$10$0uGYh5Vs77.rBroYWlpKBOmhm0CznMgT7P6i1CrcICrRwssd/yaqO', 'admin', '2024-10-01 06:16:10', '2024-10-01 06:16:10'),
(15, 'Eugenia11', 'laeuge11@gmail.com', '$2b$10$yzHMzOZjcjAHLxqBupWSyukOyaDoyliP8U0gj/XgJIM2DQFt3qkH6', 'usuario', '2024-10-01 06:19:39', '2024-10-01 06:19:39');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `deletedpayments`
--
ALTER TABLE `deletedpayments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paymentId` (`paymentId`),
  ADD KEY `eliminadoPor` (`eliminadoPor`);

--
-- Indices de la tabla `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `deletedpayments`
--
ALTER TABLE `deletedpayments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `logins`
--
ALTER TABLE `logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `deletedpayments`
--
ALTER TABLE `deletedpayments`
  ADD CONSTRAINT `deletedpayments_ibfk_1` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `deletedpayments_ibfk_2` FOREIGN KEY (`eliminadoPor`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `logins`
--
ALTER TABLE `logins`
  ADD CONSTRAINT `logins_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
