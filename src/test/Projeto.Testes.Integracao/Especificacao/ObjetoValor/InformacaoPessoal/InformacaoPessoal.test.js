const mockInformacaoPessoal = require('../../../../Projeto.Testes.Builder/ObjetoValor/InformacaoPessoal/InformacaoPessoal.builder').informcaoPessoal;
const Repositorio = require('../../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const assert = require('assert');

describe('Fabrica Informacao Pessoal', () => {
    it('Deve retornar erro de CPF inválido - 400', done => {
        let mock = mockInformacaoPessoal;
        mock.cpf = 'qweqwe';
        Repositorio.informacoesPessoais.Fabrica.criar(mock).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'CPF inválido');
            done();
        });
    });
    it('Deve retornar erro de CPF obrigatório - 400', done => {
        let mock = mockInformacaoPessoal;
        mock.cpf = '';
        Repositorio.informacoesPessoais.Fabrica.criar(mock).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'CPF é obrigatório');
            done();
        });
    });
    it('Deve retornar erro de Sexo inválido - 400', done => {
        let mock = mockInformacaoPessoal;
        mock.sexo = 5;
        Repositorio.informacoesPessoais.Fabrica.criar(mock).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Sexo inválido');
            done();
        });
    });
    it('Deve retornar erro de Email inválido - 400', done => {
        let mock = mockInformacaoPessoal;
        mock.email = '@@@@';
        Repositorio.informacoesPessoais.Fabrica.criar(mock).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Email inválido');
            done();
        });
    });
    it('Deve retornar erro de Data de Nascimento inválida - 400', done => {
        let mock = mockInformacaoPessoal;
        mock.dataNascimento = '08/04/1997'
        Repositorio.informacoesPessoais.Fabrica.criar(mock).catch(error => {
            assert.equal(error.status, 400);
            assert.equal(error.message[0].error, 'Data inválida - [yyyy-mm-dd]');
            done();
        });
    });
});
