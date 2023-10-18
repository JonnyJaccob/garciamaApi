const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const https = require('https')
const path = require('path');

app.use(express.json());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
    
    app.get('/', function (req, res) {
    res.send('hello, world!')
});
let opciones;
try{
    opciones = {
        key: fs.readFileSync(path.join(__dirname,"SSL/key.pem")),
        cert: fs.readFileSync(path.join(__dirname,"SSL/cert.pem")),
        error : "nulo"
    }
}catch(err)
{
    opciones={
        error: err
    }
}


app.get("/alumnos",async (req,resp)=>{
    try{
        resp.json({mensaje:"Hola Mundo"})
    }catch(err){
        resp.status(500).json({mensaje: "Error de conexion",tipo: err.message})
    }
    
});
app.get("/",async (req,resp)=>{
    resp.json({mensaje:"Respuesta segura"})    
});
const n = 8083
app.listen(n,(req,resp)=>{
    console.log("Servidor express escuchando "+ n);
});
try
{
    https.createServer(opciones,app).listen(n+1,(req,res)=>{
        console.log("Servidor express seguro https escuchando: " + (n+1))
    })
}catch(err){
    console.log("Error principal: " + err + " Error Opciones: " + opciones.error)  
}
