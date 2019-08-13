const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../shared/services/handler.service');

exports.executar = async (loja) => {
    try {

        const lojaAtt = {
            razaoSocial: loja.razaoSocial,
            cnpj: loja.cnpj,
            foto: loja.foto
        }

        const representanteLegalEndereco = await Repositorio.enderecos.Fabrica.criar(loja.representanteLegal.endereco);

        if (!Handler.isSuccess(representanteLegalEndereco)) {
            throw representanteLegalEndereco;
        }

        const representanteLegalInformacaoPessoal = await Repositorio.informacoesPessoais.Fabrica.criar(loja.representanteLegal.informacaoPessoal);

        if (!Handler.isSuccess(representanteLegalInformacaoPessoal)) {
            throw representanteLegalInformacaoPessoal;
        }

        const lojaRepresentanteLegal = await Repositorio.representantesLegais.Fabrica.criar(representanteLegalEndereco, representanteLegalInformacaoPessoal);

        if (!Handler.isSuccess(lojaRepresentanteLegal)) {
            throw lojaRepresentanteLegal;
        }

        const lojaEndereco = await Repositorio.enderecos.Fabrica.criar(loja.endereco);

        if (!Handler.isSuccess(lojaEndereco)) {
            throw lojaEndereco;
        }

        const newLoja = await Repositorio.lojas.Fabrica.criar(lojaAtt, lojaEndereco, lojaRepresentanteLegal);

        if (!Handler.isSuccess(newLoja)) {
            throw newLoja;
        }

        return newLoja;
    } catch (error) {
        return error;
    }
}