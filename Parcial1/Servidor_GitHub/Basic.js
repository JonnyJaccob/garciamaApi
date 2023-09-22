const express = require('express');
var cors = require('cors');
//const morgan = require('morgan');
//const fs = require('fs');
//const path = require('path');

const app = express();
// import express-basic-auth
app.use(express.json())
app.use(cors());

const basicAuth = require('express-basic-auth');

//express-basic-auth
//express-bearer-token
app.use(basicAuth(
        users={'usuario':'pass'}
    )
)
/*
app.use(bearerToken(), ValidarToken());

function ValidarToken(){
    return "Exito"
}*/
app.listen(port, () => {
    console.log('Servidor Express en funcionamiento con el puerto: ~'+ port);
});