const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');

exports.executar = async (query) => {
    try {

        const loja = await Repositorio.lojas.Dominio.Loja.find(query).populate(
            ['endereco', 'representanteLegal', 'categorias',
                {
                    path: 'representanteLegal', populate: {
                        path: 'informacaoPessoal',
                        model: 'InformacaoPessoal'
                    }
                },
                {
                    path: 'representanteLegal', populate: {
                        path: 'endereco',
                        model: 'Endereco'
                    }
                },
                {
                    path: 'categorias', populate: {
                        path: 'categoria',
                        model: 'Categoria'
                    }
                }
            ]
        );

        return loja;
    } catch (error) {
        throw error;
    }
}