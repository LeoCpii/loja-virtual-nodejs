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

        const representanteLegal = await Repositorio.representantesLegais.Fabrica.criar(representanteLegalEndereco, representanteLegalInformacaoPessoal);

        if (!Handler.isSuccess(representanteLegal)) {
            throw representanteLegal;
        }

        const lojaEndereco = await Repositorio.enderecos.Fabrica.criar(loja.endereco);

        if (!Handler.isSuccess(lojaEndereco)) {
            throw lojaEndereco;
        }

        const newLoja = await Repositorio.lojas.Fabrica.criar(lojaAtt, lojaEndereco, representanteLegal);

        if (!Handler.isSuccess(newLoja)) {
            throw newLoja;
        }

        const params = {
            loja: newLoja
        }

        await Repositorio.representantesLegais.Fabrica.atualizar(representanteLegal._id, params);

        return newLoja;
    } catch (error) {
        return error;
    }
}