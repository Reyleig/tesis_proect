const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const mysqlConexion = require('./conexion')
const credenciales = require('./routes/credenciales');

var app = express();
app.use(bodyParser.json());
app.use("/credenciales", credenciales)

app.listen(3000);