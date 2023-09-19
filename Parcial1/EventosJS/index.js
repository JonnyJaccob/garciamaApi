const events = require('events');

class Saludo extends events{
    constructor() {
        super();
    }

    saludar(){
        setTimeout(()=>{this.emit('saluda','Juan')},5000);
        setTimeout(()=>{this.emit('saluda','Juan')},8000);
        setTimeout(()=>{this.emit('saluda','Juan')},3000);
        return this.emisor;
    }

}

let saludox = new Saludo();

saludox.on('saluda',(nombre)=>{
    console.log('Hola' + nombre);
});

saludox.saludar();

const emisor = new events.EventEmitter();

emisor.on('saluda',(nombre)=>{
    console.log('Hola'+nombre)
});

emisor.addListener('saluda',(nombre)=>{
    console.log('Hola'+nombre)
});

emisor.emit('saluda','Juan');