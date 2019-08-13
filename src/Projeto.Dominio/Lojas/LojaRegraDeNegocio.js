const Validator = require('../../shared/services/Validator.service');

let arrError = [];

exports.validar = (loja) => {
    arrError = [];

    const {
        razaoSocial, cnpj, foto
    } = loja

    validaCNPJ(cnpj);

    return arrError;
}

const validaCNPJ = (cnpj) => {
    const isValid = Validator.isValidNumber(cnpj);

    if(!isValid){
        arrError.push({
            error: "CNPJ inválido"
        });
    }
}