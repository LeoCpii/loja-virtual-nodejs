const RegraDeNegocio = require('./RepresentanteLegalRegraDeNegocio');
const errorHandling = require('./../../../shared/services/ErrorHandling.service');
const Dominio = require('./RepresentanteLegal');
const Handler = require('./../../../shared/services/handler.service');

exports.criar = async (informacaoPessoal) => {

    const representanteLegal = await Dominio.RepresentanteLegal.create(
        { informacaoPessoal }
    ).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    await representanteLegal.save();

    return representanteLegal;
}

exports.atualizar = async (id, params) => {
    const attRepresentate = await Dominio.RepresentanteLegal.updateOne(
        { _id: id },
        { $set: params },
        { upsert: true }
    ).catch(e => {
        throw new Handler.HandlerError(400, e.message);
    });
    return attRepresentate;
}

const validar = (representanteLegal) => {
    const validado = RegraDeNegocio.validar(representanteLegal);
 
    if (validado.length === 0) {
        return;
    }

    throw new Handler.HandlerError(400, validado);
}