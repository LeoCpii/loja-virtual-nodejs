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
        const representanteLegalInformacaoPessoal = await Repositorio.informacoesPessoais.Fabrica.criar(loja.representanteLegal.informacaoPessoal);
        const representanteLegal = await Repositorio.representantesLegais.Fabrica.criar(representanteLegalEndereco, representanteLegalInformacaoPessoal);
        const lojaEndereco = await Repositorio.enderecos.Fabrica.criar(loja.endereco);
        const newLoja = await Repositorio.lojas.Fabrica.criar(lojaAtt, lojaEndereco, representanteLegal);

        const params = { loja: newLoja }

        await Repositorio.representantesLegais.Fabrica.atualizar(representanteLegal._id, params);

        return newLoja;
    } catch (error) {
        throw error;
    }
}