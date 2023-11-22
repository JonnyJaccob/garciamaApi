let expect = require('chai').expect;
let modulo = require('./modulo/funcion.js');


describe("Pruebas a ala funcion el numero es mayor que el otro",()=>{
    
    it('Si le mando un 1 y un 3 debe regresar false',()=>{
        let resultado = modulo.EsMayor(1,3);
        expect(resultado).to.be.a("boolean");
        expect(resultado).to.equal(false);
    })

    it('Si le mando un 3 y un 1 debe regresar true',()=>{
        let resultado = modulo.EsMayor(3,1);
        expect(resultado).to.be.a("boolean");
        expect(resultado).to.equal(true);
    })
})