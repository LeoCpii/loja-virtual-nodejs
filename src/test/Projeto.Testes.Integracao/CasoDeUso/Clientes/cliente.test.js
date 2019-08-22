const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('../../../Projeto.Testes.Builder/Clientes/cliente.builder').cliente;
const config = require('./../../../appsettings');
const endpoint = '/cliente';
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

// describe('Endpoint - Cliente', () => {
//     describe('POST /register', () => {
//         it('Deve retornar erro de CEP inválido - 400', done => {
//             mock.endereco.cep = '25050230-G';
//             chai.request(config.url)
//                 .post(`${endpoint}/register`)
//                 .send(mock)
//                 .end((err, res) => {
//                     expect(res.statusCode).to.equal(400);
//                     expect(res.body.description[0].error).to.equal('CEP inválido');
//                     done();
//                 });
//         });
//     });
// });
