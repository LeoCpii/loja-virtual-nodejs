const Validator = require('./../../../shared/services/Validator.service');
const Enum = require('./Endereco');

let arrError = [];

exports.validar = (endereco) => {
    arrError = [];

    const {
        pais, estado, cidade, bairro,
        rua, numero, complemento, cep
    } = endereco

    validaCEP(cep);
    validaEnum(pais, Enum.PAISES);

    return arrError;
}

const validaEnum = (valor, enumerador) => {
    const isValid = Validator.isValidEnum(valor, enumerador);

    if(!isValid){
        arrError.push({
            error: `País inválido`
        });
    }
}

const validaCEP = (cep) => {
    const isValid = Validator.isValidNumber(cep);

    if (!isValid) {
        arrError.push({
            error: "CEP inválido"
        });
    }
}