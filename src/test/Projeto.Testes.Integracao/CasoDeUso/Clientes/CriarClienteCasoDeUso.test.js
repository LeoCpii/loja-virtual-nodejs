const mock = require('../../../Projeto.Testes.Builder/Clientes/cliente.builder');
const relative = '/cliente/'
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./../../../../Projeto.API/app');
let should = chai.should();
chai.use(chaiHttp);

describe('Fabrica Endereco', () => {
    // GET
    // it('Deve retornar erro de País obrigatório - 400', done => {
    //     chai.request(server)
    //         .get('/register')
    //         .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('array');
    //                 res.body.length.should.be.eql(0);
    //           done();
    //         });
    // });

    // POST
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
});
