const express = require('express');
const app = express();

app.use(express.json())

app.get("/alumnos/:carrera",(req,resp)=>{
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    resp.send("Servidor Express contestando a peticion GET");
});

app.get("/alumnos",(req,resp)=>{
    resp.send("Servidor Express contestando a peticion GET");
});

app.use((req, res, next) => {
    res.status(404).send("Página no encontrada");
  });
  
app.listen(8080,(req,resp)=>{
    console.log("Servidor express escuchando");
});