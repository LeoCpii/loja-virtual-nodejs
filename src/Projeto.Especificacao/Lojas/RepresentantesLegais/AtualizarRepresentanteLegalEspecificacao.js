const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');

exports.executar = async (id, params) => {
    await Repositorio.representantesLegais.Fabrica.atualizar(id, params);
}