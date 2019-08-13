const controller = {
    cliente: require('./../../Projeto.Controller/Clientes/ClienteController'),
    categoria: require('./../../Projeto.Controller/Lojas/Categorias/CategoriasController'),
    health: require('./../../Projeto.Controller/Health/HealthController'),
    loja: require('./../../Projeto.Controller/Lojas/LojaController'),
    produto: require('./../../Projeto.Controller/Lojas/Categorias/Produtos/ProdutosController'),
};

module.exports = controller;