const Validator = require('../../../../shared/services/Validator.service');
const Enum = require('./Produto');

let arrError = [];

exports.validar = (produto) => {
    arrError = [];

    const {
        nome, descricao, valor, quantidade, status, fotos,
        detalhes = [
            {
                nomeDetalhe,
                valores: [
                    {
                        valorDetalhe
                    }
                ]
            }
        ]
    } = produto

    validaNumero(quantidade, 'Quantidade');
    validaEnum(status, Enum.STATUS);

    return arrError;
}

const validaNumero = (numero, origem) => {
    const isValid = Validator.isValidNumber(numero) && numero >= 0;

    if(!isValid){
        arrError.push({
            error: `${origem} inválido`
        });
    }
}

const validaEnum = (valor, enumerador) => {
    const isValid = Validator.isValidEnum(valor, enumerador);

    if(!isValid){
        arrError.push({
            error: `Status inválido`
        });
    }
}