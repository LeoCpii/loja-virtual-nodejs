const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../../shared/services/handler.service');

exports.executar = async (slug) => {

    const produtosSemCategoria = [];
    const categoria = await Repositorio.categorias.Dominio.Categoria.findOne({slug: slug});
    console.log(categoria)
    if (!categoria) {
        throw new Handler.HandlerError(403, 'Categoria não encontrada');
    }

    await Promise.all(categoria.produtos.map(async id => {
        const produto = await Repositorio.produtos.Dominio.Produto.findById(String(id));

        if(produto.categorias.length === 1) {
            produtosSemCategoria.push(produto);
        }
    }));

    const semCategoria = await Repositorio.categorias.Dominio.Categoria.findOne({slug: 'sem-categoria'});

    const options = {
        id: semCategoria._id,
        add: {
            produtos: produtosSemCategoria
        }
    }

    await Repositorio.categorias.Fabrica.atualizarArray(options);

    return await Repositorio.categorias.Fabrica.excluir(slug);
}