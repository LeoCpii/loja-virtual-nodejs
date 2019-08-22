const Validator = require('../../../../shared/services/Validator.service');
const Enum = require('./Produto');

let arrError = [];

exports.validar = (produto) => {
    arrError = [];

    const {
        nome, descricao, valor, quantidade, status, fotos, promocao, destaque,
        detalhes = [
            {
                nome,
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
    validaPromocao(promocao, valor);

    return arrError;
}

const validaNumero = (numero, origem) => {
    const isValid = Validator.isValidNumber(numero);

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

const validaPromocao = (promocao, valor) => {
    const isValid = promocao < valor;

    if(!isValid){
        arrError.push({
            error: `Valor da promoção deve ser menor que o valor atual`
        });
    }
}