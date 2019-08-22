const Handler = require('./../../../shared/services/handler.service');
const Repositorio = require('./../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Extension = require('./../../../shared/services/Extension.service');

exports.executar = async (email) => {
    try {

        const informacaoPessoal = await Repositorio.informacoesPessoais.Dominio.InformacaoPessoal.findOne({
            email: email
        });
        if (!informacaoPessoal) {
            throw new Handler.HandlerError(404, 'Email não registrado')
        }

        const representanteLegal = await Repositorio.representantesLegais.Dominio.RepresentanteLegal.findOne({
            informacaoPessoal: informacaoPessoal._id
        }).populate(['informacaoPessoal', 'endereco', 'loja']);

        if(Extension.EhNuloOuVazio(representanteLegal)) {
            throw new Handler.HandlerError(404, 'Email não registrado')
        }

        return representanteLegal;
    } catch (error) {
        throw error;
    }
}