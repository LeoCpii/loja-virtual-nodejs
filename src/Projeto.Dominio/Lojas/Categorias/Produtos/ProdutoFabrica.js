const RegraDeNegocio = require('./ProdutoRegraDeNegocio');
const Handler = require('../../../../shared/services/handler.service');
const Slug = require('../../../../shared/services/Slug.sevice');
const errorHandling = require('../../../../shared/services/ErrorHandling.service');
const Dominio = require('./Produto');

exports.criar = async (produto) => {

    validar(produto);

    const slug = Slug.criar(produto.nome)
    produto = { ...produto, slug };
    
    const newProduto = await Dominio.Produto.create(
        produto
    ).then().catch(e => {
        throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

    await newProduto.save();

    return newProduto.populate('detalhes.valores');
}

const validar = (produto) => {
    const validado = RegraDeNegocio.validar(produto);

    if (validado.length === 0) { return; }

    throw new Handler.HandlerError(400, validado);
}