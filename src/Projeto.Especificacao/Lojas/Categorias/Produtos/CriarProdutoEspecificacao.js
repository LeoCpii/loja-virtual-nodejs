const Repositorio = require('../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../../shared/services/handler.service');

exports.executar = async (req) => {
    try {

        const newProduto = await Repositorio.produtos.Fabrica.criar(req.produto);

        req.categorias.map(async categoria => {
            const options = {
                id: categoria,
                add: {
                    produtos: [newProduto]
                }
            }

            await Repositorio.categorias.Fabrica.atualizarArray(options);
        })

        return newProduto;
    } catch (error) {
        console.log('error aSDAS DASD SA')
        throw error;
    }
}