const Repositorio = require('../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../../shared/services/handler.service');

exports.executar = async (req) => {
    try {

        const newProduto = await Repositorio.produtos.Fabrica.criar(req.produto);

        const options = {
            id: req.categoria,
            add: {
                produtos: [newProduto]
            }
        }

        await Repositorio.categorias.Fabrica.atualizarArray(options);

        return newProduto;
    } catch (error) {
        throw error;
    }
}