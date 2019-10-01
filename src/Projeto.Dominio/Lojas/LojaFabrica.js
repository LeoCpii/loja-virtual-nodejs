const RegraDeNegocio = require('./LojaRegraDeNegocio');
const Handler = require('../../shared/services/handler.service');
const errorHandling = require('../../shared/services/ErrorHandling.service');
const Dominio = require('./Loja');

exports.criar = async (loja, endereco, representanteLegal) => {

    const {
        razaoSocial, cnpj, foto
    } = loja

    validar(loja);

    const newLoja = await Dominio.Loja.create(
        {
            razaoSocial, cnpj, foto,
            endereco,
            representanteLegal
        }
    ).then().catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors)
        );
    });

    await newLoja.save();
    return newLoja;
}

exports.associar = async (loja) => {

    const idLoja = await Dominio.Loja.findOne();

    const attLoja = await Dominio.Loja.updateOne(
        { _id: idLoja._id },
        { $addToSet: loja },
        { upsert: true }
    ).then().catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
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
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    return attLoja;
}

const validar = (loja) => {
    const validado = RegraDeNegocio.validar(loja);

    if (validado.length === 0) {
        return;
    }

    throw new Handler.HandlerError(400, validado);
}