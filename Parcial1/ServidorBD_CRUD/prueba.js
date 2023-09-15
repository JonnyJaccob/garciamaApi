let objeto = {
    id:5,
    nombre:"Gerardo",
    paterno:"Pineda",
    materno:"Zapata"
}
let campos =  Object.keys(objeto);
let valores =  Object.values(objeto);
let entrieros = Object.entries(objeto)
//console.log(campos);
//console.log(valores);
//console.log(entrieros);

let sentenciasql = "";
let cadenaUpdate = "update ejemplo.nombre "
let cadenaSet = "SET ";
let cadenaWhere = " where ";

sentenciasql += cadenaUpdate + cadenaSet;
let x = 1;
campos.forEach(capos=>{
    if(x != 1)
    {
        sentenciasql += ", "
    }
    //console.log(capos+'='+objeto[capos]);
    sentenciasql += capos+'='+objeto[capos]
    x =2;
});
sentenciasql += cadenaWhere
sentenciasql += campos[0]+' = '+objeto[campos[0]]
console.log(sentenciasql);
