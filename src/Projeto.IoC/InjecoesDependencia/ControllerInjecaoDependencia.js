const controller = {
    auth: require('./../../Projeto.Controller/Auth/AuthController'),
    cliente: require('./../../Projeto.Controller/Clientes/ClienteController'),
    categoria: require('./../../Projeto.Controller/Lojas/Categorias/CategoriasController'),
    health: require('./../../Projeto.Controller/Health/HealthController'),
    loja: require('./../../Projeto.Controller/Lojas/LojaController'),
    produto: require('./../../Projeto.Controller/Lojas/Categorias/Produtos/ProdutosController'),
    representanteLegal: require('./../../Projeto.Controller/Lojas/RepresentantesLegais/RepresentanteLegalController'),
    endereco: require('./../../Projeto.Controller/ObjetoValor/Enderecos/EnderecoController'),
    informacaoPessoal: require('./../../Projeto.Controller/ObjetoValor/InformacaoPessoal/InformacaoPessoalController'),
};

module.exports = controller;