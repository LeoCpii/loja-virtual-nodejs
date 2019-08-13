const especificacao = {
    clientes: {
        criar: require('./../../Projeto.Especificacao/Clientes/CriarClienteEspecificacao'),
        obterPorEmail: require('./../../Projeto.Especificacao/Clientes/ObterClientePorEmailEspecificacao'),
    },
    lojas: {
        criar: require('./../../Projeto.Especificacao/Lojas/CriarLojaEspecificacao'),
        obter: require('./../../Projeto.Especificacao/Lojas/ObterLojaEspecificacao'),
        categorias: {
            criar: require('./../../Projeto.Especificacao/Lojas/Categorias/CriarCategoriaEspecificacao'),
            obter: require('./../../Projeto.Especificacao/Lojas/Categorias/ObterCategoriasEspecificacao'),
            obterPorId: require('./../../Projeto.Especificacao/Lojas/Categorias/ObterCategoriaPorIdEspecificacao'),
            produtos: {
                criar: require('./../../Projeto.Especificacao/Lojas/Categorias/Produtos/CriarProdutoEspecificacao'),
                obter: require('./../../Projeto.Especificacao/Lojas/Categorias/Produtos/ObterProdutoEspecificacao'),
                obterPorId: require('./../../Projeto.Especificacao/Lojas/Categorias/Produtos/ObterProdutoPorIdEspecificacao'),
            }
        }
    }
};

module.exports = especificacao;