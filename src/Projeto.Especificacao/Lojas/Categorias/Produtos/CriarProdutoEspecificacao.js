const Repositorio = require('../../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../../shared/services/handler.service');

exports.executar = async (req) => {
    try {

        const categorias = [];

        await Promise.all(req.categorias.map(async id => {
            const categoria = await Repositorio.categorias.Dominio.Categoria.findById(id);
            
            if (!categoria) { throw new Handler.HandlerError(404, 'Categoria não encontrada'); }

            categorias.push(categoria);
        }));

        const newProduto = await Repositorio.produtos.Fabrica.criar(req.produto, categorias);
        await Promise.all(req.categorias.map(async categoria => {
            const options = {
                id: categoria,
                add: {
                    produtos: [newProduto]
                }
            }
            await Repositorio.categorias.Fabrica.associar(options);
        }));
        return newProduto;
    } catch (error) {
        throw error;
    }
}