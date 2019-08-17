const RegraDeNegocio = require('./EnderecoRegraDeNegocio');
const Handler = require('./../../../shared/services/handler.service');
const errorHandling = require('./../../../shared/services/ErrorHandling.service');
const Dominio = require('./Endereco');

exports.criar = async (endereco) => {
    validar(endereco);

    const newEndereco = await Dominio.Endereco.create(
        endereco
    ).then().catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    await newEndereco.save();

    return newEndereco;
}

const validar = (endereco) => {
    const validado = RegraDeNegocio.validar(endereco);

    if (validado.length === 0) {
        return;
    }

    throw new Handler.HandlerError(400, validado);
}