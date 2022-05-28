const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const mysqlConexion = require('./conexion')
const usuario = require('./routes/usuario');
const deportista = require('./routes/deportista');

var app = express();
app.use(bodyParser.json());
app.use("/usuario", usuario)
app.use("/deportista", deportista)

app.listen(3000);