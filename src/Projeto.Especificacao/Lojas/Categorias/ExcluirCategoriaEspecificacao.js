const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../shared/services/handler.service');

exports.executar = async (id) => {
    try {

        const newCategoria = await Repositorio.categorias.Fabrica.excluir(id);

        return newCategoria;
    } catch (error) {
        throw error;
    }
}