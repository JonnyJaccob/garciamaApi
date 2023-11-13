const PORT = 8083
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const tec = require('./routes/alumnos')
const fs = require('fs');
const { SwaggerTheme } = require('swagger-themes');

app.use(express.json())

const theme = new SwaggerTheme('v3');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
    
    app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.use('/alumnos',tec.router);

const data = fs.readFileSync(`${path.join(__dirname,'./swagger.json')}`);
const defObj = JSON.parse(data);

const swaggerOptions = {
    definition: defObj,
    apis: [`${path.join(__dirname,'./routes/alumnos.js')}`],
};

const options = {
    explorer: true,
    customCss: theme.getBuffer('dark')
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
     
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));

app.use("/api-docs-json",(req, res) =>{
    res.json(swaggerDocs)
})

app.listen(PORT,(req,resp)=>{
    console.log("Servidor express escuchando: - " + PORT);
});
