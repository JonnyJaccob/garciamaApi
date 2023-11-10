// routes/alumnos.js

const express = require('express');
const router = express.Router();
var mysql = require('mysql2/promise');

const dataDeBase = {
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'ejemplo'
}

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', (req, res) => {
    res.send('Hello World!');
})

/**
 * @swagger
 * /empleado:
 *   tags:
 *     - empleados
 *   get:
 *     description: Obtiene una lista de todos los empleados.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         description: El ID del empleado.
 *     responses:
 *       200:
 *         description: Regresa una lista de todos los empleados.
 */
router.get('/',async (req,res) =>{
    try{
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('select * from ejemplo.nombre ');
        if(rows.length == 0){
            res.status(404);
            res.json({mensaje:"Usuario no existe"})
        }else{
            res.json(rows);
        }
    }catch(err){
        res.status(500).json({mensaje: "Error de conexion",tipo: err.message, sql : err.sqlMessage})
    }
})

.get("/:id",async (req,resp)=>{
    try{
        //console.log(req.params.id);
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
    
})

.post("/" ,async (req, resp) => {
    try {
        let nombre,apellido;
        if (!(typeof req.query.nombre === "undefined") || !(typeof apellido === "undefined")){
            nombre = req.query.nombre;
            apellido = req.query.apellido;
        }else
        {
            console.log(req.body) 
            const cadena = JSON.parse(JSON.stringify(req.body)); 
            nombre = req.body.nombre; 
            apellido = req.body.apellido; 
            console.log(nombre)
            console.log(apellido)
        }
        if (typeof nombre === "undefined" || typeof apellido === "undefined") {
            resp.status(400).json({ mensaje: "Los campos 'nombre' y 'apellido' son obligatorios" });
            return;
        }

        const conexion = await mysql.createConnection(dataDeBase);
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
})

.delete("/",async (req,resp)=>{
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
    
})
.put("/",async (req,resp)=>{
    try{
        const variable = parseInt(req.query.IdUsuario);
        const objeto = req.body;
        if (typeof variable !== 'number') {
            throw new Error('La variable no es un número.');
        }
        const conexion = await mysql.createConnection(dataDeBase);
        
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
    
})

.patch("/:id", async (req, resp) => {
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
})

module.exports.router = router;
