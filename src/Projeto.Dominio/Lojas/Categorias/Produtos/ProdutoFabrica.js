const RegraDeNegocio = require('./ProdutoRegraDeNegocio');
const Handler = require('../../../../shared/services/handler.service');
const errorHandling = require('../../../../shared/services/ErrorHandling.service');
const Dominio = require('./Produto');
const Storage = require('./../../../../Projeto.ServicoExterno/Firebase/storage');

exports.criar = async (produto) => {

    validar(produto);
    console.log(produto.fotos)
    const caminhos = [];

    await Promise.all(produto.fotos.map(async foto => {
        const caminho = await Storage.upload(foto.urlBase64);
        caminhos.push(caminho)
    }));

    console.log(caminho)

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

    if (validado.length === 0) {
        return;
    }

    throw new Handler.HandlerError(400, validado);
}