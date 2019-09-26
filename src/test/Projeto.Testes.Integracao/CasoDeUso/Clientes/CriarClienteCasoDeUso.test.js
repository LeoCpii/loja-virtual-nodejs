const mock = require('../../../Projeto.Testes.Builder/Clientes/cliente.builder');
const relative = '/cliente/'
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./../../../../Projeto.API/app');
let should = chai.should();
chai.use(chaiHttp);

describe('Cliente caso de uso', () => {
    describe('1 - POST', function () {
        it('Deve Cadastrar Cliente', done => {
            chai.request(server)
                .post(`${relative}register`)
                .send(mock.cliente)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.description.should.have.property('_id');
                    done();
                });
        });
        it('Deve obter cliente cadastrado', function () {
            chai.request(server)
                .get(`${relative}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});

