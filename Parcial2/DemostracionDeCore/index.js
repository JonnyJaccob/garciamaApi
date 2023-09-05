let http = require('http');

let servidor = http.createServer(function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.write('Servidor HTTP contestando');
    res.end();
});

 const numServer = 8080
servidor.listen(numServer,()=>{
    console.log("Servidor Node-Http escuchando en puerto " + numServer);
});