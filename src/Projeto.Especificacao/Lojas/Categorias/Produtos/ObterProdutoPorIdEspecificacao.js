const Repositorio = require('../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('../../../../shared/services/handler.service');

exports.executar = async (id) => {
    try {

        const produto = Repositorio.produtos.Dominio.Produto.findById(id);

        return produto;
    } catch (error) {
        throw error;
    }
}