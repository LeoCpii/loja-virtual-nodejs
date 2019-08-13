const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../shared/services/handler.service');

exports.executar = async (categoria) => {
    try {

        const newCategoria = await Repositorio.categorias.Fabrica.criar(categoria);

        if (!Handler.isSuccess(newCategoria)) {
            throw newCategoria;
        }

        const options = {
            categorias: [ newCategoria ]
        }
        
        const lojaAtt = await Repositorio.lojas.Fabrica.atualizarArray(options);
        
        if (!Handler.isSuccess(lojaAtt)) {
            throw lojaAtt;
        }

        return newCategoria;
    } catch (error) {
        return error;
    }
}