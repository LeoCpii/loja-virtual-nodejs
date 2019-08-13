const Validator = require('./../../../shared/services/Validator.service');
let arrError = [];

exports.validar = (endereco) => {
    arrError = [];

    const {
        pais, estado, cidade, bairro,
        rua, numero, complemento, cep
    } = endereco

    validaCEP(cep);

    return arrError;
}

const validaCEP = (cep) => {
    const isValid = Validator.isValidNumber(cep);

    if (!isValid) {
        arrError.push({
            error: "CEP inválido"
        });
    }
}