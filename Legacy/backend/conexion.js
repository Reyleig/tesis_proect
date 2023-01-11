const mysql = require('mysql');
var mysqlConexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'tesis',
    // multipleStatements: true,
});

mysqlConexion.connect(
    (err) =>{
        if(!err){
            console.log("me conecte a la bd");
        }
        else{
            console.log("no me conecte a la bd");
        }
    }
    );

    module.exports = mysqlConexion;