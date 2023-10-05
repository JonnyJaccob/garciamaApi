const express = require('express');
const {validationResult, checkSchema } = require("express-validator")
const { schema } = require('./esquema');
const app = express();

app.use(express.json());

app.get('/', (rea,res, next) => {
    //Manera 1, no es recomendable
    res.status(res.send("Mensaje error"));
    //Manera 2
    let error = new Error("Descripcion del error");
    next(error);
});

app.use((err, req, res, next)=>{
    //Aqui se trata el error que llegua de la manera 2 
    //Todos los errores mandarlos aqui para que no se detenga 
    //Errores asincronicos debemos encargarnos 
    //Sincronos lo detectara express, no es nuestro problema 

});
