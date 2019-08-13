const RegraDeNegocio = require('./EnderecoRegraDeNegocio');
const Handler = require('./../../../shared/services/handler.service');
const errorHandling = require('./../../../shared/services/ErrorHandling.service');
const Dominio = require('./Endereco');

exports.criar = async (endereco) => {
    const ehValido = validar(endereco);

    if (!Handler.isSuccess(ehValido)) {
        throw ehValido;
    }

    const newEndereco = await Dominio.Endereco.create(
        endereco
    ).then().catch(e => {
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    await newEndereco.save();

    return newEndereco;
}

const validar = (endereco) => {
    const validado = RegraDeNegocio.validar(endereco);

    return validado.length === 0 ? true : {
        status: 400,
        message: validado,
    }
}