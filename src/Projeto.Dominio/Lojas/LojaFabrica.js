const RegraDeNegocio = require('./LojaRegraDeNegocio');
const Handler = require('../../shared/services/handler.service');
const errorHandling = require('../../shared/services/ErrorHandling.service');
const Dominio = require('./Loja');

exports.criar = async (loja, endereco, representanteLegal) => {

    const {
        razaoSocial, cnpj, foto, slug, tema
    } = loja

    validar(loja);

    const newLoja = await Dominio.Loja.create(
        {
            razaoSocial, cnpj, foto, slug, tema,
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

exports.associar = async (options, slug) => {

    const loja = await Dominio.Loja.findOne({ slug: slug });

    const attLoja = await Dominio.Loja.updateOne(
        { _id: loja._id },
        { $addToSet: options },
        { upsert: true }
    ).then().catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    return attLoja;
}

exports.atualizar = async (lojaId, params) => {
    const attLoja = await Dominio.Loja.updateOne(
        { _id: lojaId },
        { $set: params },
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