const RegraDeNegocio = require('./ProdutoRegraDeNegocio');
const Handler = require('../../../../shared/services/handler.service');
const Slug = require('../../../../shared/services/Slug.service');
const errorHandling = require('../../../../shared/services/ErrorHandling.service');
const Dominio = require('./Produto');
const Storage = require('./../../../../Projeto.ServicoExterno/Firebase/storage');
const File = require('../../../../shared/services/File.service');

exports.criar = async (produto, categorias, loja) => {
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
    promessas = produto.fotos.map(foto => Storage.uploadToFireBase(foto, [loja, 'produtos']));
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

const validar = produto => {
  const validado = RegraDeNegocio.validar(produto);

  if (validado.length === 0) { return; }

  throw new Handler.HandlerError(400, validado);
};

//associar