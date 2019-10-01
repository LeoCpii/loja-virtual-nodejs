const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../shared/services/handler.service');

exports.executar = async (categoria) => {
    try {

        const newCategoria = await Repositorio.categorias.Fabrica.criar(categoria);

        const options = { categorias: [ newCategoria ] }
        
        await Repositorio.lojas.Fabrica.associar(options);

        return newCategoria;
    } catch (error) {
        throw error;
    }
}