const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');

chai.use(chaiHttp);

let app = 'http://localhost:8083';

const expect = chai.expect;

describe("Prueba la ruta de alumnos", ()=>{
    it("Prueba metodo get",()=>{
        request(app)
            .get('/')
            .expect(200)
            .end((err,res) =>{
            if(err) throw err;
            console.log('GET / deberia devolver un array de alumnos')
            });
    })
})