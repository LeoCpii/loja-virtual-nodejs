const especificacao = {
    clientes: {
        criar: require('./../../Projeto.Especificacao/Clientes/CriarClienteEspecificacao'),
        obterPorEmail: require('./../../Projeto.Especificacao/Clientes/ObterClientePorEmailEspecificacao'),
    },
    lojas: {
        criar: require('./../../Projeto.Especificacao/Lojas/CriarLojaEspecificacao'),
        obter: require('./../../Projeto.Especificacao/Lojas/ObterLojaEspecificacao'),
        atualizar: require('./../../Projeto.Especificacao/Lojas/AtualizarLojaEspecificacao'),
        representanteLegal: {
            obterPorEmail: require('./../../Projeto.Especificacao/Lojas/RepresentantesLegais/ObterRepresentanteLegalPorEmailEspecificacao'),
            atualizar: require('./../../Projeto.Especificacao/Lojas/RepresentantesLegais/AtualizarRepresentanteLegalEspecificacao'),
        },
        categorias: {
            criar: require('./../../Projeto.Especificacao/Lojas/Categorias/CriarCategoriaEspecificacao'),
            obter: require('./../../Projeto.Especificacao/Lojas/Categorias/ObterCategoriasEspecificacao'),
            obterPorSlug: require('../../Projeto.Especificacao/Lojas/Categorias/ObterCategoriaPorSlugEspecificacao'),
            atualizar: require('../../Projeto.Especificacao/Lojas/Categorias/AtualizarCategoriaEspecificacao'),
            excluir: require('./../../Projeto.Especificacao/Lojas/Categorias/ExcluirCategoriaEspecificacao'),
            produtos: {
                criar: require('./../../Projeto.Especificacao/Lojas/Categorias/Produtos/CriarProdutoEspecificacao'),
                obter: require('./../../Projeto.Especificacao/Lojas/Categorias/Produtos/ObterProdutoEspecificacao'),
                obterPorId: require('../../Projeto.Especificacao/Lojas/Categorias/Produtos/ObterProdutoPorIdEspecificacao'),
            }
        }
    },
    objetoValor: {
        // endereco: {
        //     obterPorCEP: require('./../../Projeto.CasoDeUso/ObjetoValor/Enderecos/EnderecoCasoDeUso')
        // },
        informacaoPessoal: {
            atualizar: require('./../../Projeto.Especificacao/ObjetoValor/InformacoesPessoais/AtualizarInformacaoPessoalEspecificacao')
        }
    }
};

module.exports = especificacao;