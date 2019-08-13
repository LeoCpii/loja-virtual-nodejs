const Repositorio = require('../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../../shared/services/handler.service');

exports.executar = async (req) => {
    try {

        const newProduto = await Repositorio.produtos.Fabrica.criar(req.produto);

        if (!Handler.isSuccess(newProduto)) {
            throw newProduto;
        }

        const options = {
            id: req.categoria,
            add: {
                produtos: [newProduto]
            }
        }

        const categoriaAtt = await Repositorio.categorias.Fabrica.atualizarArray(options);

        if (!Handler.isSuccess(categoriaAtt)) {
            throw categoriaAtt;
        }

        return newProduto;
    } catch (error) {
        return error;
    }
}