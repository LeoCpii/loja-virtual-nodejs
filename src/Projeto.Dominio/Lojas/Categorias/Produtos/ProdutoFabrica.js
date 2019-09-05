const RegraDeNegocio = require('./ProdutoRegraDeNegocio');
const Handler = require('../../../../shared/services/handler.service');
const Slug = require('../../../../shared/services/Slug.sevice');
const errorHandling = require('../../../../shared/services/ErrorHandling.service');
const Dominio = require('./Produto');
const Storage = require('./../../../../Projeto.ServicoExterno/Firebase/storage');
const Uploads = require('./../../../../shared/services/Upload.service');

exports.criar = async (produto, categorias) => {
  validar(produto);

  const slug = Slug.criar(produto.nome);
  const existe = await Dominio.Produto.findOne({ slug: slug });
  let pathServer = [];
  // if (existe) { throw new Handler.HandlerError(422, 'Esse produto já foi cadastrado.'); } 

  const caminhos = [];

  await Promise.all(categorias.map(async categoria => {
    await Promise.all(produto.fotos.map(async foto => {
      const path = Uploads.gerenatePath(categoria, foto.name);
      const base64Data = foto.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');

      Uploads.upload(path.server, base64Data);
      let caminho = await Storage.uploadToFireBase(path.server, path.firebase);

      caminho = caminho.replace(categoria, '##CATEGORIA##');
      console.log(caminho)
      caminhos.push(caminho);
      pathServer.push(path.server)
    }));
  }));

  produto = { ...produto, fotos: caminhos, slug };

  const newProduto = await Dominio.Produto.create(produto)
    .catch(e => {
      throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

  await newProduto.save();

  pathServer.map(path => {
    Uploads.delete(path)
  });

  return newProduto.populate('detalhes.valores');
};

const validar = produto => {
  const validado = RegraDeNegocio.validar(produto);

  if (validado.length === 0) { return; }

  throw new Handler.HandlerError(400, validado);
};
