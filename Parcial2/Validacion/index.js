const express = require('express');
const {check,query, validationResult } = require('express-validator')

const app = express();

app.use(express.json());

//app.post("/Alumno",query("person").notEmpty(),(req,res) =>{
//const result = validitionResult(req);
//if(result.isEmpty()){
//        return res.send()
//    }
//    res.send({error: result.array()})
//    //res.json({mensaje:"Respuesta a peticion post"})
//})

app.get('/Alumnos', query('person').notEmpty(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
});

//app.post('/Alumnos', check('edad').isNumeric(),(req, res) => {
//  const result = validationResult(req);
//  if (result.isEmpty()) {
//    console.log(req.body)
//    return res.send(`Hello, ${req.query.person}!`);
//  }else {
//      res.json(result)
//  }
//});

app.post('/Alumnos/', [ check('edad').isNumeric(),
                      check('correo').isEmail()],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      console.log(req.body)
      return res.send(`Hello, ${req.body}!`);
    }else {
        res.json(result)
    }
});

app.listen(8080,()=>{
    console.log("Servidor express escuchando 8080"); 
})