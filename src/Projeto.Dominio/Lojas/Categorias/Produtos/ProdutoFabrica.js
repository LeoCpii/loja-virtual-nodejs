const RegraDeNegocio = require('./ProdutoRegraDeNegocio');
const Handler = require('../../../../shared/services/handler.service');
const errorHandling = require('../../../../shared/services/ErrorHandling.service');
const Dominio = require('./Produto');

exports.criar = async (produto) => {

    const ehValido = validar(produto);

    if (!Handler.isSuccess(ehValido)) {
        throw ehValido;
    }

    const newProduto = await Dominio.Produto.create(
        produto
    ).then().catch(e => {
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    await newProduto.save();

    return newProduto.populate('detalhes.valores');
}

const validar = (produto) => {
    const validado = RegraDeNegocio.validar(produto);

    return validado.length === 0 ? true : {
        status: 400,
        message: validado,
    }
}