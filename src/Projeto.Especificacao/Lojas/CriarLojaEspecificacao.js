const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Slug = require('./../../shared/services/Slug.service');

exports.executar = async (loja) => {
    const slug = Slug.criar(loja.razaoSocial);

    const lojaAtt = {
        razaoSocial: loja.razaoSocial,
        cnpj: loja.cnpj,
        slug: slug,
        tema: loja.tema
    }

    // const representanteLegalEndereco = await Repositorio.enderecos.Fabrica.criar(loja.representanteLegal.endereco);
    const InformacaoPessoal = await Repositorio.informacoesPessoais.Fabrica.criar(loja.representanteLegal.informacaoPessoal);
    const representanteLegal = await Repositorio.representantesLegais.Fabrica.criar(InformacaoPessoal);
    const lojaEndereco = await Repositorio.enderecos.Fabrica.criar(loja.endereco);
    const newLoja = await Repositorio.lojas.Fabrica.criar(lojaAtt, lojaEndereco, representanteLegal);

    const dataCategoria = {
        nome: 'Sem categoria',
        descricao: 'Produtos que não possuem categorias',
        cor: '#34465D'
    }

    const categoria = await Repositorio.categorias.Fabrica.criar(dataCategoria)

    const params = { loja: newLoja }
    const options = { categorias: [categoria] }

    await Repositorio.lojas.Fabrica.associar(options, slug);
    await Repositorio.representantesLegais.Fabrica.atualizar(representanteLegal._id, params);

    return newLoja;
}