const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('../../../shared/services/handler.service');

exports.executar = async (id) => {
    try {

        const categoria = await Repositorio.categorias.Dominio.Categoria.findById(id).populate(['produtos']);
        
        return categoria;
    } catch (error) {
        throw error;
    }
}