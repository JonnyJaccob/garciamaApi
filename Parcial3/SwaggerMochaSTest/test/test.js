const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const request = require('supertest');

let app = 'http://localhost:8083';

describe("Prueba la ruta de alumnos", ()=>{
    it("Prueba metodo get",()=>{
        request(app)
            .get('/alumnos')
            .expect(200)
            .end((err,res) =>{
            if(err) throw err;
            console.log('GET / deberia devolver un array de alumnos')
            });
    })
})