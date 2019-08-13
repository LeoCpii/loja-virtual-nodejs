const Validator = require('../../../shared/services/Validator.service');
const Enum = require('./InformacaoPessoal');

let arrError = [];

exports.validar = (informacaoPessoal) => {
    arrError = [];

    const {
        cpf,
        email,
        sexo,
        DataNascimento
    } = informacaoPessoal
    
    validaEmail(email);
    validaEnum(sexo, Enum.SEXO);
    validaData(DataNascimento);
    validaCPF(cpf);

    return arrError;
}

const validaEmail = (email) => {
    const isValid = Validator.isValidEmail(email);

    if(!isValid){
        arrError.push({
            error: "Email inválido"
        });
    }
}

const validaEnum = (valor, enumerador) => {
    const isValid = Validator.isValidEnum(valor, enumerador);

    if(!isValid){
        arrError.push({
            error: `Sexo inválido`
        });
    }
}

const validaData = (data) => {
    const isValidFormat = Validator.isValidDate(data);
    const isValidAge = Validator.isValidAge(data)

    if(!isValidFormat){
        arrError.push({
            error: `Data inválida - [yyyy-mm-dd]`
        });
    }

    if(!isValidAge){
        arrError.push({
            error: `Idade inválida`
        });
    }
}

const validaCPF = (data) => {
    const isValid = Validator.isValidNumber(data);

    if(!isValid){
        arrError.push({
            error: `Cpf inválido`
        });
    }
}