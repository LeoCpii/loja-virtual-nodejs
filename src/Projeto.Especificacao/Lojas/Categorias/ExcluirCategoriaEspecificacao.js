const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../shared/services/handler.service');

exports.executar = async (id) => {
    try {
        const semCategoria = [];
        const categoria = await Repositorio.categorias.Dominio.Categoria.findById(id);

        if (!categoria) { throw new Handler.HandlerError(404, 'Categoria não encontrada') }

        if (categoria.slug === 'sem-categoria') { throw new Handler.HandlerError(404, 'Essa categoria não pode ser excluída') }

        await Promise.all(categoria.produtos.map(async idProduto => {
            const produto = await Repositorio.produtos.Dominio.Produto.findById(idProduto.toString());
            if (produto.categorias.length === 1) {
                semCategoria.push(produto);
            }
        }));

        const categoriaDefault = await Repositorio.categorias.Dominio.Categoria.findOne({slug: 'sem-categoria'});

        const options = {
            id: categoriaDefault._id,
            add: {
                produtos: semCategoria
            }
        }

        await Repositorio.categorias.Fabrica.atualizarArray(options)

        const newCategoria = await Repositorio.categorias.Fabrica.excluir(id);

        return newCategoria;
    } catch (error) {
        throw error;
    }
}