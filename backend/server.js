const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const mysqlConexion = require('./conexion')
const usuario = require('./routes/usuario');

var app = express();
app.use(bodyParser.json());
app.use("/usuario", usuario)

app.listen(3000);