const Validator = require('../../../shared/services/Validator.service');

let arrError = [];

exports.validar = (categoria) => {
    arrError = [];

    const {
        nome, descricao, cor
    } = categoria

    validaCor(cor);

    return arrError;
}

const validaCor = (cor) => {
    const isValid = Validator.isValidColor(cor);

    if(!isValid){
        arrError.push({
            error: "Cor inválida: A cor deve estar no formato hexadecimal"
        });
    }
}