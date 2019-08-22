const chai = require('chai');
const mock = require('../../../../Projeto.Testes.Builder/ObjetoValor/Endereco/Endereco.builder').endereco;
const Fabrica = require('../../../../../Projeto.Dominio/ObjetoValor/Enderecos/EnderecoFabrica');
const expect = chai.expect;

describe('Fabrica Endereco', () => {
    it('Deve retornar erro de CEP inválido - 400', done => {
        mock.cep = '25050230-G';
        mock.pais = null;
        
        Fabrica.criar(mock).catch(error => {
            expect(error.status).to.equal(400);
            expect(error.message[0].error).to.equal('CEP inválido');
            done();
        });
    });
});
