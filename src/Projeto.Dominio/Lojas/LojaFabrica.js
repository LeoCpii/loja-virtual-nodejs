const RegraDeNegocio = require('./LojaRegraDeNegocio');
const Handler = require('../../shared/services/handler.service');
const errorHandling = require('../../shared/services/ErrorHandling.service');
const Dominio = require('./Loja');

exports.criar = async (loja, endereco, representanteLegal) => {

    const {
        razaoSocial, cnpj, foto
    } = loja

    const ehValido = validar(loja);

    if (!Handler.isSuccess(ehValido)) {
        throw ehValido;
    }

    const newLoja = await Dominio.Loja.create(
        {
            razaoSocial, cnpj, foto,
            endereco,
            representanteLegal
        }
    ).then().catch(e => {
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    await newLoja.save();
    return newLoja;
}

exports.atualizarArray = async (loja) => {

    const idLoja = await Dominio.Loja.findOne();

    const attLoja = await Dominio.Loja.updateOne(
        { _id: idLoja._id },
        { $addToSet: loja },
        { upsert: true }
    ).then().catch(e => {
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    return attLoja;
}

exports.atualizar = async (loja) => {

    const idLoja = await Dominio.Loja.findOne();

    const attLoja = await Dominio.Loja.updateOne(
        { _id: idLoja._id },
        { $set: loja },
        { upsert: true }
    ).then().catch(e => {
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    return attLoja;
}

const validar = (loja) => {
    const validado = RegraDeNegocio.validar(loja);

    return validado.length === 0 ? true : {
        status: 400,
        message: validado,
    }
}