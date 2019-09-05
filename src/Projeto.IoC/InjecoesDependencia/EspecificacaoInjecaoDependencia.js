const especificacao = {
    clientes: {
        criar: require('./../../Projeto.Especificacao/Clientes/CriarClienteEspecificacao'),
        obterPorEmail: require('./../../Projeto.Especificacao/Clientes/ObterClientePorEmailEspecificacao'),
    },
    lojas: {
        criar: require('./../../Projeto.Especificacao/Lojas/CriarLojaEspecificacao'),
        obter: require('./../../Projeto.Especificacao/Lojas/ObterLojaEspecificacao'),
        representanteLegal: {
            obterPorEmail: require('./../../Projeto.Especificacao/Lojas/RepresentantesLegais/ObterRepresentanteLegalPorEmailEspecificacao'),
        },
        categorias: {
            criar: require('./../../Projeto.Especificacao/Lojas/Categorias/CriarCategoriaEspecificacao'),
            obter: require('./../../Projeto.Especificacao/Lojas/Categorias/ObterCategoriasEspecificacao'),
            obterPorSlug: require('../../Projeto.Especificacao/Lojas/Categorias/ObterCategoriaPorSlugEspecificacao'),
            excluir: require('./../../Projeto.Especificacao/Lojas/Categorias/ExcluirCategoriaEspecificacao'),
            produtos: {
                criar: require('./../../Projeto.Especificacao/Lojas/Categorias/Produtos/CriarProdutoEspecificacao'),
                obter: require('./../../Projeto.Especificacao/Lojas/Categorias/Produtos/ObterProdutoEspecificacao'),
                obterPorSlug: require('../../Projeto.Especificacao/Lojas/Categorias/Produtos/ObterProdutoPorSlugEspecificacao'),
            }
        }
    }
};

module.exports = especificacao;