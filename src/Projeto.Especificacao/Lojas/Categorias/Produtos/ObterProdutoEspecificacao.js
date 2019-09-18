const Repositorio = require('../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');

exports.executar = async (query) => {
    try {
        const produtos = Repositorio.produtos.Dominio.Produto.find(query);

        return produtos;
    } catch (error) {
        throw error;
    }
}