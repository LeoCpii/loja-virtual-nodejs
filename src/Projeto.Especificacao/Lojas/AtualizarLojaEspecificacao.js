const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Slug = require('./../../shared/services/Slug.service');

exports.executar = async (lojaId, params) => {
    await Repositorio.lojas.Fabrica.atualizar(lojaId, params);
}