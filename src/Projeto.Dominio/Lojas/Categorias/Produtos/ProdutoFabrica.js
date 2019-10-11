const RegraDeNegocio = require('./ProdutoRegraDeNegocio');
const Handler = require('../../../../shared/services/handler.service');
const Slug = require('../../../../shared/services/Slug.service');
const errorHandling = require('../../../../shared/services/ErrorHandling.service');
const Dominio = require('./Produto');
const Storage = require('./../../../../Projeto.ServicoExterno/Firebase/storage');
const File = require('../../../../shared/services/File.service');

exports.criar = async (produto, categorias) => {
  // 1. validar
  validar(produto);
  // 2. Criar o slug
  const slug = Slug.criar(produto.nome);

  // 3. Verificar se exists
  const existe = await Dominio.Produto.findOne({ slug: slug });
  if (existe) { throw new Handler.HandlerError(422, 'Esse produto já foi cadastrado.'); };

  // 4. Salvar fotos no FireStore (caso existam)
  let promessas = '';
  if (produto.fotos.length > 0) {
    promessas = produto.fotos.map(foto => Storage.uploadToFireBase(foto));
    const caminhos = await Promise.all(promessas);
    produto.fotos.map(foto => File.exclude(`${foto.name}/`));
    produto = { ...produto, fotos: caminhos, slug, categorias: categorias };
  }

  // 5. Salvar o produto
  const newProduto = await Dominio.Produto.create(produto)
    .catch(e => {
      throw new Handler.HandlerError(400, errorHandling.concatErrors(e.errors));
    });

  await newProduto.save();

  // return 'estuda ae campeao';
  return newProduto.populate('detalhes.valores');
}


exports.criarOLD = async (produto, categorias) => {
  validar(produto);

  const slug = Slug.criar(produto.nome);
  const existe = await Dominio.Produto.findOne({ slug: slug });
  let pathServer = [];

  if (existe) { throw new Handler.HandlerError(422, 'Esse produto já foi cadastrado.'); }

  const caminhos = [];

  // Salvando fotos no FireStore.
  if (produto.fotos.length > 0) {

    // var fotos = produto.fotos.map(async foto => {
    //   const path = Uploads.gerenatePath('produtos', foto.name);
    //   const base64Data = foto.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    //   Uploads.upload(path.server, base64Data);

    //   const url = await Storage.uploadToFireBase(path.server, path.firebase);

    //       .then(resolve => {
    //         console.log(resolve)
    //         pathServer.push(path.server);
    //         if (index === categorias.length - 1) { caminhos.push(resolve); }
    //       }).catch(err => {
    //         throw err;
    //       });
    // });

    await Promise.all(categorias.map(async (categoria, index) => {
      await Promise.all(produto.fotos.map(async foto => {
        const path = Uploads.gerenatePath('produtos', foto.name);
        const base64Data = foto.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        Uploads.upload(path.server, base64Data);
        Storage.uploadToFireBase(path.server, path.firebase)
          .then(resolve => {
            pathServer.push(path.server);
            if (index === categorias.length - 1) { caminhos.push(resolve); }
          }).catch(err => {
            throw err;
          });
      })).catch(err => {
        throw new Handler.HandlerError(500, err);
      });
    }));
  }
  if (true) throw new Handler.HandlerError(404, 'tenta de novo');

  produto = { ...produto, fotos: caminhos, slug, categorias: categorias };

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

//associar