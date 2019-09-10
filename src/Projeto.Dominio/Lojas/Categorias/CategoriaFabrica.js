const RegraDeNegocio = require('./CategoriaRegraDeNegocio');
const Handler = require('../../../shared/services/handler.service');
const errorHandling = require('../../../shared/services/ErrorHandling.service');
const Dominio = require('./Categoria');
const Extension = require('./../../../shared/services/Extension.service');
const Slug = require('./../../../shared/services/Slug.service');

exports.criar = async (categoria) => {

    validar(categoria);

    const slug = Slug.criar(categoria.nome)
    categoria = { ...categoria, slug };

    const jaExiste = await Dominio.Categoria.findOne({ slug: slug });

    if(jaExiste) { throw new Handler.HandlerError(422, 'Já existe uma categoria com esse nome.'); };

    const newCategoria = await Dominio.Categoria.create(
        categoria
    ).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    await newCategoria.save();

    return newCategoria;
}

exports.atualizarArray = async (options) => {
    const categoria = await Dominio.Categoria.findById(options.id);
    
    if (Extension.EhNuloOuVazio(categoria)) {
        throw new Handler.HandlerError(400, 'Categoria não encontrada');
    }

    const attCategoria = await Dominio.Categoria.updateOne(
        { _id: categoria._id },
        { $addToSet: options.add },
        { upsert: true }
    ).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors))
    });

    return attCategoria;
}

exports.atualizar = async (categoria) => {

    const idCategoria = await Dominio.Categoria.findById(categoria);

    const attCategoria = await Dominio.Categoria.updateOne(
        { _id: idCategoria._id },
        { $set: categoria },
        { upsert: true }
    ).then().catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors)
        );
    });

    return attCategoria;
}

exports.excluir = async (categoriaId) => {
    await Dominio.Categoria.deleteOne({
        _id: categoriaId
    }).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors)
        );
    });;
}

const validar = (categoria) => {
    const validado = RegraDeNegocio.validar(categoria);

    if (validado.length === 0) {
        return;
    }

    throw new Handler.HandlerError(400, validado);
}