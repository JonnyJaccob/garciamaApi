const express = require('express');
const app = express();
//var cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
//var mysql2 = require('mysql2/promise');
//const multer = require('multer');

//const multer = require('multer')
//const upload = multer()
const tec = require('./alumno.js')



app.use(express.json())
//app.use(cors());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
    
    app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.use('/Alumno',tec.router);

const dataDeBase = {
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'ejemplo'
}

/*
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
        //req.query o req.body o red.params
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

app.post("/Alumnos", upload.none() ,async (req, resp) => {
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
            resp.status(400).json({ mensaje: "Los campos 'nombre' y 'apellido' son obligatorios" });
            return;
        }

        const conexion = await mysql2.createConnection(dataDeBase);
        const sql = 'INSERT INTO ejemplo.nombre (nombre, apellido) VALUES (?, ?)';
        const [result] = await conexion.execute(sql, [nombre, apellido]);

        if (result.affectedRows === 1) {
            resp.status(201).json({ mensaje: "Alumno creado exitosamente" });
        } else {
            resp.status(500).json({ mensaje: "Error al crear el alumno" });
        }
    } catch (err) {
        resp.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
    }
});

app.delete("/alumnos",async (req,resp)=>{
    try{
        const variable = req.query.idUsuario;
        console.log(variable);
        const conexion = await mysql2.createConnection(dataDeBase);
        const queryy = 'delete from ejemplo.nombre where id='+variable;
        console.log(queryy);
        const [rows, fields] = await conexion.query(queryy);
        if(rows.affectedRows == 0){
            resp.json({mensaje:"Registro no eliminado"});
        }else{
            resp.json({mensaje:"Registro eliminado"});
        }
    }catch(err){
        resp.status(500).json({mensaje: "Error de conexion",tipo: err.message, sql : err.sqlMessage})
    }
    
});
app.put("/alumnos",async (req,resp)=>{
    try{
        const variable = parseInt(req.query.IdUsuario);
        const objeto = req.body;
        if (typeof variable !== 'number') {
            throw new Error('La variable no es un número.');
        }
        const conexion = await mysql2.createConnection(dataDeBase);
        
        let campos =  Object.keys(objeto);
        
        let sentenciasql = "";
        let cadenaUpdate = "update ejemplo.nombre "
        let cadenaSet = "SET ";
        let cadenaWhere = " where ";
        
        sentenciasql += cadenaUpdate + cadenaSet;
        let x = 1;
        campos.forEach(capos=>{
            if(x != 1)
            {
                sentenciasql += ", "
            }
            //console.log(capos+'='+objeto[capos]);
            if(typeof objeto[capos] === 'string')
            {
                sentenciasql += capos + "='" + objeto[capos] + "'";
            }else
            {
                sentenciasql += capos+'='+objeto[capos]
            }
            x =2;
        });
        sentenciasql += cadenaWhere
        sentenciasql += campos[0]+' = '+variable;
        console.log(sentenciasql);
        const [rows, fields] = await conexion.query(sentenciasql);
        if(rows.affectedRows == 0){
            resp.json({mensaje:"Registro sin cambios"});
        }else{
            resp.json({mensaje:"Registro tuvo cambios"});
        }
    }catch(err){
        resp.status(500).json({mensaje: "Error de conexion",tipo: err.message, sql : err.sqlMessage})
    }
    
});

app.patch("/alumnos/:id", async (req, resp) => {
    try {
      const variable = parseInt(req.query.IdUsuario);
      const conexion = await mysql2.createConnection(dataDeBase);
      const sql = 'UPDATE ejemplo.nombre SET nombre = ?, apellido = ? WHERE id = ?';
      const { nombre, apellido } = req.body;
      const [result] = await conexion.execute(sql, [nombre, apellido, variable]);
      
      if (result.affectedRows === 0) {
        resp.status(404).json({ mensaje: "Usuario no encontrado" });
      } else {
        resp.json({ mensaje: "Usuario actualizado exitosamente" });
      }
    } catch (err) {
      resp.status(500).json({ mensaje: "Error de conexión", tipo: err.message, sql: err.sqlMessage });
    }
  });
app.get("/alumnos/:id",async (req,resp)=>{
    try{
        //req.query o req.body o red.params
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
*/
app.listen(8080,(req,resp)=>{
    console.log("Servidor express escuchando");
});