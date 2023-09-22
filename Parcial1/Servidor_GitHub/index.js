const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
var mysql = require('mysql2/promise');
const basicAuth = require('express-basic-auth');
const axios = require('axios');

const app = express();

app.use(express.json())
app.use(cors());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
        
    app.get('/', function (req, res) {
        res.send('hello, world!')
    });
function obtenerTokenDesdeJSON() {
    try {
        console.log("Incio de obtencion de token")
        const configJSON = fs.readFileSync(path.join(__dirname, 'token.json'), 'utf-8');
        const config = JSON.parse(configJSON);
        return config.tokenGithub;
    } catch (error) {
        console.error('Error al leer el archivo JSON de configuración:', error);
        return '';
    }
}
app.use((req, res, next) => {
    try {
        const authMiddleware = basicAuth({
            users: { 'JonnyJaccob': obtenerTokenDesdeJSON() },
            unauthorizedResponse: 'Acceso no autorizado',
        });
        authMiddleware(req, res, next);
    } catch (err) {
        console.error('Error en el middleware de autenticación: ', err);
        res.status(500).json({ error: 'Error en el middleware de autenticación' });
    }
});

app.get('/github-api', async (req, res) => {
    try {
        if(!req.auth.user  || req.auth.password)
        {
            return res.status(401).json({error: 'Token de auth requerido'})
        }
        res.send("Servidor express contestando");

        /*
        console.log('Comenzando enlace...')
        //console.log(`user: ${req.auth.user} password: ${req.auth.password}`)
        const 
        response = await axios.get('https://api.github.com/users/JonnyJaccob/repos', {
        headers: {
          'Authorization': `token ${req.auth.user}:${req.auth.password}`,
          'User-Agent': 'Servidor_Github' 
        }
      });
      console.log('Conexion a github correcta');
      res.json(response.data);
        $('#table').bootstrapTable({
            url:'http://localhost:8080/Alumnos',
            columns: [{
                field: 'ID',
                title: 'ID Alumno'
            }, {
                field: 'NOMBRE',
                title: 'Nombre Alumno'
            }, {
                field: 'APELLIDO',
                title: 'Apellido Alumno'
            }]
        })*/
    } catch (error) {
        const mensaje = 'Error en la solicitud a la API de GitHub - '
        res.status(500).json({ error: mensaje });
        console.log(mensaje + " " + error)
    }
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

//BD
const dataDeBase = {
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'ejemplo'
}
app.get("/alumnos",async (req,resp)=>{
    try{
        //req.query o req.body o red.params
        const conexion = await mysql.createConnection(dataDeBase);
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

app.delete("/alumnos",async (req,resp)=>{
    try{
        const variable = req.query.idUsuario;
        console.log(variable);
        const conexion = await mysql.createConnection(dataDeBase);
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
        //console.log(variable);
        const conexion = await mysql.createConnection(dataDeBase);
        //let objeto = {
        //    id:5,
        //    nombre:"Gerardo",
        //    apellido:"Pineda"
        //}
        let campos =  Object.keys(objeto);
        //let valores =  Object.values(objeto);
        
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
      const conexion = await mysql.createConnection(dataDeBase);
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
  
app.listen(8080,(req,resp)=>{
    console.log("Servidor express escuchando");
});