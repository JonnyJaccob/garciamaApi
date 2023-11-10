const PORT = 8083
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const tec = require('./routes/alumnos')

app.use(express.json())

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
    
    app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.use('/alumnos',tec.router);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
    info: {
        title: 'API Alumnos',
        version: '1.0.0',
    },
    servers:[
        {url: "http://localhost:"+PORT}
    ],
    },
    apis: [`${path.join(__dirname,'./routes/alumnos.js')}`],
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);
     
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.listen(PORT,(req,resp)=>{
    console.log("Servidor express escuchando: - " + PORT);
});
