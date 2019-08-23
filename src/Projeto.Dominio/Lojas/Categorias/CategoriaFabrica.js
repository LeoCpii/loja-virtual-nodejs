const RegraDeNegocio = require('./CategoriaRegraDeNegocio');
const Handler = require('../../../shared/services/handler.service');
const errorHandling = require('../../../shared/services/ErrorHandling.service');
const Dominio = require('./Categoria');
const Extensao = require('./../../Comum/Extensao');
const Extension = require('./../../../shared/services/Extension.service');

exports.criar = async (categoria) => {

    const {
        nome, descricao, cor
    } = categoria

    validar(categoria);

    const newCategoria = await Dominio.Categoria.create({
        nome, descricao, cor
    }).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    await newCategoria.save();

    return newCategoria;
}

exports.atualizarArray = async (options) => {
    try {
        const categoria = await Dominio.Categoria.findOne({ _id: options.id });
        console.log(categoria)
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
    } catch (error) {
        throw error;
    }

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