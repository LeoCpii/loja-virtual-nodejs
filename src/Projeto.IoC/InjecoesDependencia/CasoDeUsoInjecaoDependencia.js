const CasoDeUso = {
    auth: {
        autenticar: require('./../../Projeto.CasoDeUso/Auth/AutenticarClienteCasoDeUso'),
    },
    health: {
        verificarSaude: require('./../../Projeto.CasoDeUso/Health/VerificarSaudeCasoDeUso'),
    },
    cliente: {
        criar: require('./../../Projeto.CasoDeUso/Clientes/CriarClienteCasoDeUso'),
        auth: require('./../../Projeto.CasoDeUso/Clientes/AutenticarClienteCasoDeUso'),
    },
    loja: {
        criar: require('./../../Projeto.CasoDeUso/Lojas/CriarLojaCasoDeUso'),
        obter: require('./../../Projeto.CasoDeUso/Lojas/ObterLojaCasoDeUso'),
        representanteLegal: {
            auth: require('./../../Projeto.CasoDeUso/Lojas/RepresentantesLegais/AutenticarRepresentanteLegalCasoDeUso'),
        },
        categoria: {
            criar: require('./../../Projeto.CasoDeUso/Lojas/Categorias/CriarCategoriaCasoDeUso'),
            obter: require('./../../Projeto.CasoDeUso/Lojas/Categorias/ObterCategoriasCasoDeUso'),
            obterPorId: require('./../../Projeto.CasoDeUso/Lojas/Categorias/ObterPorIdCategoriasCasoDeUso'),
            produto: {
                criar: require('../../Projeto.CasoDeUso/Lojas/Categorias/Produtos/CriarProdutosCasoDeUso'),
                obter: require('../../Projeto.CasoDeUso/Lojas/Categorias/Produtos/ObterProdutosCasoDeUso'),
                obterPorId: require('../../Projeto.CasoDeUso/Lojas/Categorias/Produtos/ObterPorIdProdutosCasoDeUso')
            }
        }
    },
    objetoValor: {
        endereco: {
            obterPorCEP: require('./../../Projeto.CasoDeUso/ObjetoValor/Enderecos/EnderecoCasoDeUso')
        }
    }
};

module.exports = CasoDeUso;