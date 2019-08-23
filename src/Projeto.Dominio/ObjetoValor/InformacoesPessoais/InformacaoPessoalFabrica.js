const RegraDeNegocio = require('./InformacaoPessoalRegraDeNegocio');
const Handler = require('./../../../shared/services/handler.service');
const errorHandling = require('./../../../shared/services/ErrorHandling.service');
const Dominio = require('./InformacaoPessoal');

exports.criar = async (informacaoPessoal) => {

    validar(informacaoPessoal);

    const newCliente = await Dominio.InformacaoPessoal.create(
        informacaoPessoal
    ).catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    await newCliente.save();

    return newCliente;
}

const validar = (informacaoPessoal) => {
    const validado = RegraDeNegocio.validar(informacaoPessoal);

    if (validado.length === 0) {
        return;
    }

    throw new Handler.HandlerError(400, validado);
}