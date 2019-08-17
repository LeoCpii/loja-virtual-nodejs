const Repositorio = require('../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('../../../../shared/services/handler.service');

exports.executar = async (req) => {
    try {

        const produtos = Repositorio.produtos.Dominio.Produto.find();

        return produtos;
    } catch (error) {
        throw error;
    }
}