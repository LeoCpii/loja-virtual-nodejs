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
    validaBase64(fotos);
    validaPromocao(promocao, valor);
    validaNome(nome);

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

const validaNome = (nome) => {
    const isValid = !!nome;

    if(!isValid){
        arrError.push({
            error: `${origem} inválido`
        });
    }
}

const validaBase64 = (fotos) => {
    const result = [];

    fotos.map(foto => {
        const isValid = Validator.isValidBase64(foto.base64);
        result.push(isValid);
    });

    if(result.includes(false)){
        arrError.push({
            error: `A imagem deve estar no formato base64`
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