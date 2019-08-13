const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../shared/services/handler.service');

exports.executar = async () => {
    try {

        const loja = await Repositorio.lojas.Dominio.Loja.find().populate(
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
        return error;
    }
}