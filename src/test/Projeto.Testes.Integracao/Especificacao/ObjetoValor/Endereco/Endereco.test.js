const mock = require('../../../../Projeto.Testes.Builder/ObjetoValor/Endereco/Endereco.builder');
const Repositorio = require('../../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const assert = require('assert');

describe('Fabrica Endereco', () => {
    it('Deve retornar erro de País obrigatório - 400', done => {
        const value = mock.getMock('pais', '');
        Repositorio.enderecos.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'País é obrigatório');
            done();
        });
    });
    it('Deve retornar erro de Estado obrigatório - 400', done => {
        const value = mock.getMock('estado', '');
        Repositorio.enderecos.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Estado é obrigatório');
            done();
        });
    });
    it('Deve retornar erro de Cidade obrigatória - 400', done => {
        const value = mock.getMock('cidade', '');
        Repositorio.enderecos.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Cidade é obrigatória');
            done();
        });
    });
    it('Deve retornar erro de Bairro obrigatória - 400', done => {
        const value = mock.getMock('bairro', '');
        Repositorio.enderecos.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Bairro é obrigatório');
            done();
        });
    });
    it('Deve retornar erro de Rua obrigatória - 400', done => {
        const value = mock.getMock('rua', '');
        Repositorio.enderecos.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Rua é obrigatória');
            done();
        });
    });
    it('Deve retornar erro de Número obrigatória - 400', done => {
        const value = mock.getMock('numero', '');
        Repositorio.enderecos.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Número é obrigatório');
            done();
        });
    });
    it('Deve retornar erro de CEP inválido - 400', done => {
        const value = mock.getMock('cep', '25050230G');
        Repositorio.enderecos.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'CEP inválido');
            done();
        });
    });
    it('Deve retornar erro de CEP inválido (min: 11) - 400', done => {
        const value = mock.getMock('cep', '2505023');
        Repositorio.enderecos.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Tamanho inválido de CEP');
            done();
        });
    });
    it('Deve retornar erro de CEP inválido (max: 11) - 400', done => {
        const value = mock.getMock('cep', '2505022222');
        Repositorio.enderecos.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Tamanho inválido de CEP');
            done();
        });
    });
});
