const RegraDeNegocio = require('./InformacaoPessoalRegraDeNegocio');
const Handler = require('./../../../shared/services/handler.service');
const errorHandling = require('./../../../shared/services/ErrorHandling.service');
const Dominio = require('./InformacaoPessoal');

exports.criar = async (informacaoPessoal) => {

    const {
        nome, sobrenome, foto, dataNascimento, cpf, sexo, email, senha
    } = informacaoPessoal;

    validar(informacaoPessoal);

    const newCliente = await Dominio.InformacaoPessoal.create({
        nome, sobrenome, foto, dataNascimento, cpf, sexo, email, senha
    }).then().catch(e => {
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