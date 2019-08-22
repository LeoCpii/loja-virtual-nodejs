const chai = require('chai');
const mockInformacaoPessoal = require('../../../../Projeto.Testes.Builder/ObjetoValor/InformacaoPessoal/InformacaoPessoal.builder').informcaoPessoal;
const Repositorio = require('../../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const expect = chai.expect;

describe('Fabrica Informacao Pessoal', done => {
    it('Deve retornar erro de CPF inválido - 400', done => {
        const mockCpf = mockInformacaoPessoal;
        mockCpf.cpf = 'qweqwe';
        Repositorio.informacoesPessoais.Fabrica.criar(mockCpf).catch(error => {
            expect(error.status).to.equal(400);
            expect(error.message[0].error).to.equal('CPF inválido');
            done();
        });
    });
    it('Deve retornar erro de CPF obrigatório - 400', done => {
        const mockCpf = mockInformacaoPessoal;
        mockCpf.cpf = '';
        Repositorio.informacoesPessoais.Fabrica.criar(mockCpf).catch(error => {
            expect(error.status).to.equal(400);
            expect(error.message[0].error).to.equal('CPF é obrigatório');
            done();
        });
    });
    it('Deve retornar erro de Sexo inválido - 400', done => {
        const mock = mockInformacaoPessoal;
        mock.sexo = 5;
        Repositorio.informacoesPessoais.Fabrica.criar(mock).catch(error => {
            expect(error.status).to.equal(400);
            expect(error.message[0].error).to.equal('Sexo inválido');
            done();
        });
    });
    it('Deve retornar erro de Email inválido - 400', done => {
        const mock = mockInformacaoPessoal;
        mock.email = '@@@@';
        Repositorio.informacoesPessoais.Fabrica.criar(mock).catch(error => {
            expect(error.status).to.equal(400);
            expect(error.message[0].error).to.equal('Email inválido');
            done();
        });
    });
    // it('Deve retornar erro de Data de Nascimento inválida - 400', done => {
    //     const mock = mockInformacaoPessoal;
    //     mock.dataNascimento = '08/04/1997'
    //     Repositorio.informacoesPessoais.Fabrica.criar(mock).catch(error => {
    //         expect(error.status).to.equal(400);
    //         expect(error.message[0].error).to.equal('Data inválida - [yyyy-mm-dd]');
    //         done();
    //     });
    // });
});
