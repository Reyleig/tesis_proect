const express = require('express')
const Router = express.Router();
const mysqlConexion = require('../conexion');

Router.post("/", (req, res) => {
    mysqlConexion.query(`SELECT * FROM  deportista `, (err,rows,fields) => {
        console.log(rows);

        if(!err){
            if(rows.length > 0){

                res.send(rows)
            }else{
                res.send([])
            }
        }
        else{
            res.send("Erro interno del servidor ")
        }
    }) 
}
)
module.exports = Router;