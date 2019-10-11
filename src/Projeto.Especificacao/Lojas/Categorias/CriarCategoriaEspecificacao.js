const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../shared/services/handler.service');

exports.executar = async (categoria, loja) => {
    try {
        const newCategoria = await Repositorio.categorias.Fabrica.criar(categoria, loja);

        const options = { categorias: [ newCategoria ] }
        
        await Repositorio.lojas.Fabrica.associar(options, loja);

        return newCategoria;
    } catch (error) {
        throw error;
    }
}