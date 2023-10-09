const express = require('express');
const joi = require('joi')
const app = express();
const {registroEsquema} = require('./schema/registro')
const validation = require('./middleware/JoiValidation')

app.use(express.json());
app.use(express.urlencoded({extended:false}))


function ocultarContrasena(contrasena) {
    // Crea una cadena de asteriscos con la misma longitud que la contraseña
    var asteriscos = '*'.repeat(contrasena.length);
    return asteriscos;
}

app.post("/joi",validation(registroEsquema),(req,res) =>{
    const {usuario,password,repeat_password,birth_year,email} = req.body;
    res.send(`Usuario: ${usuario}, password: ${ocultarContrasena(password)}, Fecha de nacimiento: ${birth_year}, email: ${email} `)
});

app.listen(8080,(req,resp)=>{
    console.log("Servidor express escuchando el puerto 8080");
});