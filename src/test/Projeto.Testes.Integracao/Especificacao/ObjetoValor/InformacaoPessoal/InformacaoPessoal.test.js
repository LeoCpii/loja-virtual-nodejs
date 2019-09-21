const mock = require('../../../../Projeto.Testes.Builder/ObjetoValor/InformacaoPessoal/InformacaoPessoal.builder');
const Repositorio = require('../../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const assert = require('assert');

describe('Fabrica Informacao Pessoal', () => {
    it('Deve retornar erro de Nome obrigatório - 400', done => {
        const value = mock.getMock('nome', '');
        Repositorio.informacoesPessoais.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Nome é obrigatório');
            done();
        });
    });
    it('Deve retornar erro de Sobrenome obrigatório - 400', done => {
        const value = mock.getMock('sobrenome', '');
        Repositorio.informacoesPessoais.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Sobrenome é obrigatório');
            done();
        });
    });
    it('Deve retornar erro de CPF inválido - 400', done => {
        const value = mock.getMock('cpf', 'qweqwe');
        Repositorio.informacoesPessoais.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'CPF inválido');
            done();
        });
    });
    it('Deve retornar erro de CPF obrigatório - 400', done => {
        const value = mock.getMock('cpf', '');
        Repositorio.informacoesPessoais.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'CPF é obrigatório');
            done();
        });
    });
    it('Deve retornar erro de Tamanho inválido de CPF - 400', done => {
        const value = mock.getMock('cpf', '1482306967933');
        Repositorio.informacoesPessoais.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Tamanho inválido de CPF');
            done();
        });
    });
    it('Deve retornar erro de Tamanho inválido de CPF - 400', done => {
        const value = mock.getMock('cpf', '1482306967');
        Repositorio.informacoesPessoais.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Tamanho inválido de CPF');
            done();
        });
    });
    it('Deve retornar erro de Sexo inválido - 400', done => {
        const value = mock.getMock('sexo', 5);
        Repositorio.informacoesPessoais.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Sexo inválido');
            done();
        });
    });
    it('Deve retornar erro de Email inválido - 400', done => {
        const value = mock.getMock('email', '@@@@');
        Repositorio.informacoesPessoais.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Email inválido');
            done();
        });
    });
    it('Deve retornar erro de Data de Nascimento inválida - 400', done => {
        const value = mock.getMock('dataNascimento', '08/04/1997');
        Repositorio.informacoesPessoais.Fabrica.criar(value).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Data inválida - [yyyy-mm-dd]');
            done();
        });
    });
});
