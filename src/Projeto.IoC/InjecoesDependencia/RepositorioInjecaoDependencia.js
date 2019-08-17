const repositorio = {
    clientes: require('./../../Projeto.Repositorio/Clientes/ClienteRepositorio'),
    enderecos: require('../../Projeto.Repositorio/ObjetoValor/Enderecos/EnderecoRepositorio'),
    informacoesPessoais: require('../../Projeto.Repositorio/ObjetoValor/InformacoesPessoais/InformacoesPessoaisRepositorio'),
    lojas: require('./../../Projeto.Repositorio/Lojas/LojaRespositorio'),
    representantesLegais: require('../../Projeto.Repositorio/Lojas/RepresentantesLegais/RepresentanteLegalRepositorio'),
    categorias: require('../../Projeto.Repositorio/Lojas/Categorias/CategoriaRepositorio'),
    produtos: require('../../Projeto.Repositorio/Lojas/Categorias/Produtos/ProdutosRepositorio'),
    extensoes: require('../../Projeto.Dominio/Comum/Extensao')
};

module.exports = repositorio;