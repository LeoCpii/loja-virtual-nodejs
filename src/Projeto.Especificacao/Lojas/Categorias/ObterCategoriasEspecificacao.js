const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../shared/services/handler.service');

exports.executar = async () => {
    try {

        const categorias = await Repositorio.categorias.Dominio.Categoria.find();

        return categorias;
    } catch (error) {
        throw error;
    }
}