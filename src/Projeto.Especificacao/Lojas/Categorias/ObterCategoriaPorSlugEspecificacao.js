const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('../../../shared/services/handler.service');

exports.executar = async (slug) => {
    try {

        const categoria = await Repositorio.categorias.Dominio.Categoria.findOne({slug: slug})
            .populate(['produtos']);
        
        return categoria;
    } catch (error) {
        throw error;
    }
}