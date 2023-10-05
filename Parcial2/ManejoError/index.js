const express = require('express');
const app = express();
var cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
var mysql2 = require('mysql2/promise');
const bodyParser = require("body-parser"); //sin uso
const multer = require('multer');

//const multer = require('multer')
const upload = multer()


app.use(express.json())
app.use(cors());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
    
    app.get('/', function (req, res) {
    res.send('hello, world!')
});



const dataDeBase = {
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'ejemplo'
}
app.get("/alumnos",async (req,resp)=>{
    try{
        //req.query o req.body o red.params
        const conexion = await mysql2.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('select * from ejemplo.nombre ');
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
app.get("/alumnos/:id",async (req,resp)=>{
    try{
        console.log(req.params.id);
        const conexion = await mysql2.createConnection(dataDeBase);
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
app.use(express.urlencoded({ extended: true }));

app.post("/Alumnos", upload.none() ,async (req, resp,next) => {
    try {
        let nombre,apellido;
        if (!(typeof req.query.nombre === "undefined") || !(typeof apellido === "undefined")){
            nombre = req.query.nombre;
            apellido = req.query.apellido;
        }else
        {
            console.log(req.body) // [Object: null prototype] { nombre: 'Rey', apellido: 'Misterio' }
            const cadena = JSON.parse(JSON.stringify(req.body)); // { nombre: 'Rey', apellido: 'Misterio' }
            nombre = req.body.nombre; //Rey
            apellido = req.body.apellido; //Misterio
            console.log(nombre)
            console.log(apellido)
        }
        if (typeof nombre === "undefined" || typeof apellido === "undefined") {
            //resp.status(400).json({ mensaje: "Los campos 'nombre' y 'apellido' son obligatorios" });
            let error = new Error("Los campos 'nombre' y 'apellido' son obligatorios")
            next(error);
            return;
        }

        const conexion = await mysql2.createConnection(dataDeBase);
        const sql = 'INSERT INTO ejemplo.nombre (nombre, apellido) VALUES (?, ?)';
        const [result] = await conexion.execute(sql, [nombre, apellido]);

        if (result.affectedRows === 1) {
            resp.status(201).json({ mensaje: "Alumno creado exitosamente" });
        } else {
            //resp.status(500).json({ mensaje: "Error al crear el alumno" });
            let error = new Error("Error al crear el alumno")
            next(error)
        }
    } catch (err) {
        //resp.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
        let error = new Error("Error de conexión"+err.message + err.sqlMessage )
        next(error)
    }
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.listen(8080,(req,resp)=>{
    console.log("Servidor express escuchando");
});