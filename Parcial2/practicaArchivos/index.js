//console.log(__dirname);
//console.log(__filename);

const fsc = require('fs');//CALLBACK
const path = require('path');
const { jsPDF } = require("jspdf"); // will automatically load the node version
var xl = require('excel4node');

// Generacion de un archivo de texto con el moodelo Fs usandolo como callback
fsc.writeFile(path.join(__dirname,'archivoc.txt'),"Archivo creado api callback",(err) =>{
    if(err)
    {
        console.log(err);
    }else
    {
        console.log("Archivo creado con el api fs callback");
    }
});

// Instalacion del paquete jsPdf para agregarle a la aplicacion la habilidad de la generacion  de pdf

const doc = new jsPDF();
doc.text("Hello world!", 10, 10);
doc.save(path.join(__dirname,"a4.pdf")); // will save the file in the current working directory
//recordar poner el path.join

//Generacion de excel 

// Require library

// Create a new instance of a Workbook class
var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet('Sheet 1');

// Create a reusable style
var style = wb.createStyle({
  font: {
    color: '#FF0800',
    size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});

// Set value of cell A1 to 100 as a number type styled with paramaters of style
ws.cell(1, 1)
  .number(100)
  .style(style);

wb.write(path.join(__dirname,'Excel.xlsx'));