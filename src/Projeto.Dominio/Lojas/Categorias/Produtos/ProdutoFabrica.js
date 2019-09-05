const RegraDeNegocio = require("./ProdutoRegraDeNegocio");
const Handler = require("../../../../shared/services/handler.service");
const Slug = require("../../../../shared/services/Slug.sevice");
const errorHandling = require("../../../../shared/services/ErrorHandling.service");
const Dominio = require("./Produto");
const Storage = require("./../../../../Projeto.ServicoExterno/Firebase/storage");
const Uploads = require("./../../../../shared/services/Upload.service");

exports.criar = async produto => {
  validar(produto);
  const caminhos = [];
  let caminho;

  const promises = produto.fotos.map(async foto => {
    const path = Uploads.gerenatePath("comidas", foto.name);
    const base64Data = foto.base64.replace(/^data:([A-Za-z-+/]+);base64,/, "");

    Uploads.upload(path.server, base64Data);
    caminho = await Storage.uploadToFireBase(path.server, path.firebase);
    caminhos.push(caminho);
  });

  await Promise.all(promises);

  produto = { ...produto, fotos: caminhos };

  const slug = Slug.criar(produto.nome);
  produto = { ...produto, slug };

  const newProduto = await Dominio.Produto.create(produto)
    .then()
    .catch(e => {
      throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

  await newProduto.save();

  return newProduto.populate("detalhes.valores");
};

const validar = produto => {
  const validado = RegraDeNegocio.validar(produto);

    if (validado.length === 0) { return; }

  throw new Handler.HandlerError(400, validado);
};
