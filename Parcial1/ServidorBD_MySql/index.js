const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
var mysql = require('mysql2/promise');

const app = express();

app.use(express.json())
app.use(cors());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
        
    app.get('/', function (req, res) {
        res.send('hello, world!')
    });
/*
app.get("/alumnos/:carrera",(req,resp)=>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'ejemplo'
    });
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        console.log('connected as id ' + connection.threadId);
    });
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
            console.log('The solution is: ', results[0].solution);
            connection.end();
            resp.jsonp(results);
    });
});*/
const dataDeBase = {
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'ejemplo'
}
/*
app.get("/alumnos/",(req,resp)=>{
    mysql.createConnection(dataDeBase)
    .then(conn => conn.query('select * from tabla'))
    .then(([rows, fields]) => res.json(rows))
});*/
/*    
app.get("/alumnos/",async (req,resp)=>{
    const conexion = await mysql.createConnection(dataDeBase);
    cont [rows, fields] = await conn.query('select * from nombre');
    res.json(rows);
});
*/
/*
app.get("/alumnos/",async (req,resp)=>{
    try{
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('select * from ejemplo.nombre');
    }catch(err){
        resp.json({mensaje: "Error de conexion"})
        console.log(err.message)
    }
    
});
*/
app.get("/alumnos/:id",async (req,resp)=>{
    try{
        //req.query o req.body o red.params
        console.log(req.params.id);
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('select * from ejemplo.nombre where id='+req.params.id);
        if(rows.length == 0){
            resp.status(404);
            resp.json({mensaje:"Usuario no existe"})
        }else{
            resp.json(rows);
        }
    }catch(err){
        resp.status(500).json({mensaje: "Error de conexion",tipo: err.message, sql : err.sqlMessage})
    }
    
});

app.listen(8080,(req,resp)=>{
    console.log("Servidor express escuchando");
});