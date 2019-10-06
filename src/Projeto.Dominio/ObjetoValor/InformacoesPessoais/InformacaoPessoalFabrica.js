const RegraDeNegocio = require('./InformacaoPessoalRegraDeNegocio');
const Handler = require('./../../../shared/services/handler.service');
const errorHandling = require('./../../../shared/services/ErrorHandling.service');
const Dominio = require('./InformacaoPessoal').InformacaoPessoal;

exports.criar = async (informacaoPessoal) => {

    validar(informacaoPessoal);

    const newCliente = await Dominio.create(
        informacaoPessoal
    ).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    await newCliente.save();

    return newCliente;
}

exports.atualizar = async (params, id) => {
    const attCategoria = await Dominio.updateOne(
        { _id: id },
        { $set: params },
        { upsert: true }
    ).catch(e => {
        throw new Handler.HandlerError(400, e.message);
    });

    return attCategoria;
}


const validar = (informacaoPessoal) => {
    const validado = RegraDeNegocio.validar(informacaoPessoal);

    if (validado.length === 0) {
        return;
    }

    throw new Handler.HandlerError(400, validado);
}