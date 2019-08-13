const RegraDeNegocio = require('./InformacaoPessoalRegraDeNegocio');
const Handler = require('./../../../shared/services/handler.service');
const errorHandling = require('./../../../shared/services/ErrorHandling.service');
const Dominio = require('./InformacaoPessoal');

exports.criar = async (informacaoPessoal) => {

    const {
        nome, sobrenome, foto, DataNascimento, cpf, sexo, email, senha
    } = informacaoPessoal;

    const ehValido = validar(informacaoPessoal);

    if (!Handler.isSuccess(ehValido)) {
        throw ehValido;
    }

    const newCliente = await Dominio.InformacaoPessoal.create({
        nome, sobrenome, foto, DataNascimento, cpf, sexo, email, senha
    }).then().catch(e => {
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    await newCliente.save();

    return newCliente;
}

const validar = (informacaoPessoal) => {
    const validado = RegraDeNegocio.validar(informacaoPessoal);

    return validado.length === 0 ? true : {
        status: 400,
        message: validado,
    }
}