const RegraDeNegocio = require('./RepresentanteLegalRegraDeNegocio');
const errorHandling = require('./../../../shared/services/ErrorHandling.service');
const Dominio = require('./RepresentanteLegal');

exports.criar = async (endereco, informacaoPessoal) => {

    const representanteLegal = await Dominio.RepresentanteLegal.create(
        { endereco, informacaoPessoal  }
    ).then().catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    await representanteLegal.save();

    return representanteLegal;
}

const validar = (representanteLegal) => {
    const validado = RegraDeNegocio.validar(RepresentanteLegal);
 
    if (validado.length === 0) {
        return;
    }

    throw new Handler.HandlerError(400, validado);
}

exports.atualizar = async (id, representanteLegal) => {

    const attRepresentate = await Dominio.RepresentanteLegal.updateOne(
        { _id: id },
        { $set: representanteLegal },
        { upsert: true }
    ).then().catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });
    return attRepresentate;
}