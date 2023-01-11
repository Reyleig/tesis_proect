const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const mysqlConexion = require('./conexion')
const usuario = require('./routes/usuario');
const deportista = require('./routes/deportista');

var app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.json());
app.use("/usuario", usuario)
app.use("/deportista", deportista)

app.listen(3000);

