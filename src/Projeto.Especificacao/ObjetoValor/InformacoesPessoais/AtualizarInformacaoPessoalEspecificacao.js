const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');

exports.executar = async (id, params) => {
    await Repositorio.informacoesPessoais.Fabrica.atualizar(params, id);
}