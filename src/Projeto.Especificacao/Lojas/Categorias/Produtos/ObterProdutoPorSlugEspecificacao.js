const Repositorio = require('../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('../../../../shared/services/handler.service');

exports.executar = async (slug) => {
    try {

        const produto = Repositorio.produtos.Dominio.Produto.findOne({slug: slug});

        return produto;
    } catch (error) {
        throw error;
    }
}