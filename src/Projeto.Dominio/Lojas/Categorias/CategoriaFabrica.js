const RegraDeNegocio = require('./CategoriaRegraDeNegocio');
const Handler = require('../../../shared/services/handler.service');
const errorHandling = require('../../../shared/services/ErrorHandling.service');
const Dominio = require('./Categoria').Categoria;
const Extension = require('./../../../shared/services/Extension.service');
const Slug = require('./../../../shared/services/Slug.service');

exports.criar = async (categoria, loja = '') => {
    validar(categoria);
    console.log(categoria)
    const slug = Slug.criar(categoria.nome);

    const jaExiste = await Dominio.findOne({ slug: slug, loja: loja });
    if (jaExiste) { throw new Handler.HandlerError(422, 'Já existe uma categoria com esse nome.'); };

    categoria = { ...categoria, slug };

    if (loja) {
        categoria = { ...categoria, slug, loja };
    }

    const newCategoria = await Dominio.create(
        categoria
    ).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    await newCategoria.save();

    return newCategoria;
}

exports.associar = async (options) => {
    const categoria = await Dominio.findById(options.id);

    if (Extension.EhNuloOuVazio(categoria)) {
        throw new Handler.HandlerError(400, 'Categoria não encontrada');
    }

    const attCategoria = await Dominio.updateOne(
        { _id: categoria._id },
        { $addToSet: options.add },
        { upsert: true }
    ).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors))
    });

    return attCategoria;
}

exports.atualizar = async (params, categoriaId) => {
    const idCategoria = await Dominio.findById(categoriaId);

    if (!idCategoria) { throw new Handler.HandlerError(404, 'Categoria não encontrada.'); };

    const attCategoria = await Dominio.updateOne(
        { _id: categoriaId },
        { $set: params },
        { upsert: true }
    ).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    return attCategoria;
}

exports.excluir = async (slug) => {
    await Dominio.deleteOne({
        slug: slug
    }).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors)
        );
    });
}

const validar = (categoria) => {
    const validado = RegraDeNegocio.validar(categoria);

    if (validado.length === 0) {
        return;
    }

    throw new Handler.HandlerError(400, validado);
}