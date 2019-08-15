const Repositorio = require('./../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');

exports.executar = async (email) => {
    try {

        const informacaoPessoal = await Repositorio.informacoesPessoais.Dominio.InformacaoPessoal.findOne({
            email: email
        });

        if (!informacaoPessoal) {
            throw {
                status: 404,
                message: 'Email não registrado'
            }
        }

        const representanteLegal = await Repositorio.representantesLegais.Dominio.RepresentanteLegal.findOne({
            informacaoPessoal: informacaoPessoal._id
        }).populate(['informacaoPessoal', 'endereco']);

        if(Repositorio.extensoes.EhNuloOuVazio(representanteLegal)) {
            throw {
                status: 404,
                message: 'Email não registrado'
            }
        }

        return representanteLegal;
    } catch (error) {
        return error;
    }
}