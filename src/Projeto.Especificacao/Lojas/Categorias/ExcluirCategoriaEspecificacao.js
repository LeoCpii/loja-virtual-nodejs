const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../shared/services/handler.service');

exports.executar = async (slug) => {
    const produtosSemCategoria = [];
    const categoria = await Repositorio.categorias.Dominio.Categoria.findOne({ slug: slug });

    if (!categoria) { throw new Handler.HandlerError(404, 'Categoria não encontrada') }

    if (categoria.slug === 'sem-categoria') { throw new Handler.HandlerError(403, 'Essa categoria não pode ser excluída') }

    await Promise.all(categoria.produtos.map(async idProduto => {
        const produto = await Repositorio.produtos.Dominio.Produto.findById(idProduto.toString());
        if (produto.categorias.length === 1) {
            produtosSemCategoria.push(produto);
        }
    }));

    if (produtosSemCategoria.length > 0) {
        const semCategoria = await Repositorio.categorias.Dominio.Categoria.findOne({ slug: 'sem-categoria' });

        const options = {
            id: semCategoria._id,
            add: {
                produtos: produtosSemCategoria
            }
        }

        await Repositorio.categorias.Fabrica.associar(options);
    }

    return await Repositorio.categorias.Fabrica.excluir(slug);
}