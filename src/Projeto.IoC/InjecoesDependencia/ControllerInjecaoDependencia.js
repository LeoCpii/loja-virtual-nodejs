const controller = {
    authenticate: require('./../../Projeto.Controller/Authenticate/AuthenticateController'),
    cliente: require('./../../Projeto.Controller/Clientes/ClienteController'),
    loja: require('./../../Projeto.Controller/Lojas/LojaController'),
    categoria: require('./../../Projeto.Controller/Lojas/Categorias/CategoriasController'),
    produto: require('./../../Projeto.Controller/Lojas/Categorias/Produtos/ProdutosController'),
};

module.exports = controller;