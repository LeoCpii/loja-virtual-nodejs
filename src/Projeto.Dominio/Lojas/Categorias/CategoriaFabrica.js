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

    const ehValido = validar(categoria);

    if (!Handler.isSuccess(ehValido)) {
        throw ehValido;
    }

    const newCategoria = await Dominio.Categoria.create({
        nome, descricao, cor
    }).then().catch(e => {
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    await newCategoria.save();

    return newCategoria;
}

exports.atualizarArray = async (options) => {
   
    const categoria = await Dominio.Categoria.findOne({ _id: options.id });

    if(Extension.EhNuloOuVazio(categoria)){
        throw {
            status: 400,
            message: 'Categoria não encontrada'
        }
    }

    const attCategoria = await Dominio.Categoria.updateOne(
        { _id: categoria._id },
        { $addToSet: options.add },
        { upsert: true }
    ).then().catch(e => {
        throw { 
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
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
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    return attCategoria;
}

const validar = (categoria) => {
    const validado = RegraDeNegocio.validar(categoria);

    return validado.length === 0 ? true : {
        status: 400,
        message: validado,
    }
}