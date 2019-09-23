const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Slug = require('./../../../shared/services/Slug.service');

exports.executar = async (categoria, categoriaId) => {
    try {
        
        if ( categoria.nome ) {
            const slug = Slug.criar(categoria.nome)
            categoria = { ...categoria, slug: slug }
        }

        await Repositorio.categorias.Fabrica.atualizar(categoria, categoriaId);

    } catch (error) {
        throw error;
    }
}