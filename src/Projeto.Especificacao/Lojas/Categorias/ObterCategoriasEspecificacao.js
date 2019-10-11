const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../shared/services/handler.service');

exports.executar = async (query) => {
    try {

        const categorias = await Repositorio.categorias.Dominio.Categoria.find(query);

        return categorias;
    } catch (error) {
        throw error;
    }
}