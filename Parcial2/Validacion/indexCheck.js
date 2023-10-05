const express = require('express');
const {validationResult, checkSchema } = require("express-validator")
const { schema } = require('./esquema');
const app = express();

app.use(express.json());

app.post('/Alumnos/', checkSchema(schema), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    console.log(req.body);
    return res.send(`Hello, ${req.body}!`);
  } else {
    res.json(result);
  }
});


app.listen(8080,()=>{
    console.log("Servidor express escuchando 8080"); 
})