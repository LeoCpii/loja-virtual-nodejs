const RegraDeNegocio = require('./ClienteRegraDeNegocio');
const Handler = require('./../../shared/services/handler.service');
const errorHandling = require('./../../shared/services/ErrorHandling.service');
const Dominio = require('./Cliente');

exports.criar = async (endereco, informacaoPessoal) => {

    const newCliente = await Dominio.Cliente.create(
        { informacaoPessoal, endereco }
    ).then().catch(e => {
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    await newCliente.save();

    return newCliente;
}

const validar = (cliente) => {
    const validado = RegraDeNegocio.validar(cliente);
 
    return validado.length === 0 ? true : {
        status: 400,
        message: validado,
    }
}