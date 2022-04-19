const express = require('express')
const Router = express.Router();
const mysqlConexion = require('../conexion');

Router.post("/", (req, res) => {
    console.log(req.body);
    mysqlConexion.query(`SELECT * FROM  credenciales where email="${req.body.email}" and Password="${req.body.Password}"`, (err,rows,fields) => {

        if(!err){
            if(rows.length > 0){

                res.send(true)
            }else{
                res.send(false)
            }
        }
        else{
            res.send("Erro interno del servidor ")
        }
    }) 
}
)
module.exports = Router;