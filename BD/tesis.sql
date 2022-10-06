-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-10-2022 a las 14:55:04
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tesis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deportista`
--

CREATE TABLE `deportista` (
  `id_deportista` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `edad` varchar(255) NOT NULL,
  `celular` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `deportista`
--

INSERT INTO `deportista` (`id_deportista`, `nombre`, `apellido`, `edad`, `celular`, `email`, `categoria`, `date`, `time`) VALUES
(11, 'sebastian', 'morales', '23', '3006629947', 'smorales@play.com', 'novato', '2022/08/16', ''),
(111, 'jorgito', 'vasquez', '24', '3234941412', 'jorge@play.com', 'novato', '2022/08/16', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenador_deportista`
--

CREATE TABLE `entrenador_deportista` (
  `identrenador` int(11) NOT NULL,
  `iddeportista` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `entrenador_deportista`
--

INSERT INTO `entrenador_deportista` (`identrenador`, `iddeportista`) VALUES
(1, 3),
(5, 4),
(5, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idrol` int(11) NOT NULL DEFAULT '0',
  `tiporol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idrol`, `tiporol`) VALUES
(1, 'Administrador'),
(2, 'Entrenador'),
(3, 'Deportista');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_usuario`
--

CREATE TABLE `rol_usuario` (
  `id` int(11) NOT NULL,
  `idrol` int(11) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rol_usuario`
--

INSERT INTO `rol_usuario` (`id`, `idrol`, `idusuario`) VALUES
(1, 2, 1),
(2, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `swimmer`
--

CREATE TABLE `swimmer` (
  `id_deportista` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `edad` varchar(255) NOT NULL,
  `celular` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `idrol` int(11) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `name`, `email`, `password`, `idrol`, `token`) VALUES
(1, 'jorgito', 'a@a.com', 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY0NTM5NTk1LCJleHAiOjE2NjQ1Mzk2NTV9.Kt0NL9BaPpV-90GUpi3yTmI5M88DJ_H6GKZFmpgQovA'),
(2, 'iakita', 'a@b.com', 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYi5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY0NTM5NjI2LCJleHAiOjE2NjQ1Mzk2ODZ9.Crx7mn4WQf6gNidiL4H-HEio0_NVD1xS28UtJzLGyI0'),
(3, 'janiercito', 'a@d.com', 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZC5jb20iLCJwYXNzd29yZCI6ImZjc00wa2VxbElsdVpsd3pkcGFudmhqVGg2ZU5iVlcwaFV0Lzk5V1NVRUk9IiwiaWF0IjoxNjY0NTQxODYxLCJleHAiOjE2NjQ1NDE5MjF9.WKkLqkvCk492HZPeMpNWBEheqk8dR3ySBtMdEOK_gW8'),
(4, 'mateito', 'a@f.com', 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6ImFAYS5jb20iLCJpYXQiOjE2NjQzNzA1ODEsImV4cCI6MTY2NDM3MDY0MX0.APi6gvOYrr3Br5qkuQwTWTs7hmXWzAis8eQ8noJE6zc'),
(5, 'estebanquito', 'a@g.com', 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZy5jb20iLCJwYXNzd29yZCI6ImFAYS5jb20iLCJpYXQiOjE2NjQzNzUwNjIsImV4cCI6MTY2NDM3NTEyMn0.I-SzVv1WhIs7dzyu0lu4zuWoo2aWSLZVxTQacunAggY'),
(6, 'miguelito', 'a@h.com', 'fcsM0keqlIluZlwzdpanvhjTh6eNbVW0hUt/99WSUEI=', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6ImFAYS5jb20iLCJpYXQiOjE2NjQzNzA1ODEsImV4cCI6MTY2NDM3MDY0MX0.APi6gvOYrr3Br5qkuQwTWTs7hmXWzAis8eQ8noJE6zc');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `deportista`
--
ALTER TABLE `deportista`
  ADD PRIMARY KEY (`id_deportista`);

--
-- Indices de la tabla `entrenador_deportista`
--
ALTER TABLE `entrenador_deportista`
  ADD PRIMARY KEY (`identrenador`,`iddeportista`),
  ADD KEY `deportista_usuario_id_fk` (`iddeportista`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idrol`);

--
-- Indices de la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol_usuario_rol_idrol_fk` (`idrol`),
  ADD KEY `rol_usuario_usuario_id_fk` (`idusuario`);

--
-- Indices de la tabla `swimmer`
--
ALTER TABLE `swimmer`
  ADD PRIMARY KEY (`id_deportista`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `deportista`
--
ALTER TABLE `deportista`
  MODIFY `id_deportista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT de la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `swimmer`
--
ALTER TABLE `swimmer`
  MODIFY `id_deportista` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `entrenador_deportista`
--
ALTER TABLE `entrenador_deportista`
  ADD CONSTRAINT `deportista_usuario_id_fk` FOREIGN KEY (`iddeportista`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `entrenador_usuario_id_fk` FOREIGN KEY (`identrenador`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD CONSTRAINT `rol_usuario_rol_idrol_fk` FOREIGN KEY (`idrol`) REFERENCES `rol` (`idrol`),
  ADD CONSTRAINT `rol_usuario_usuario_id_fk` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
