const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Extension = require('./../../shared/services/Extension.service');

exports.executar = async (email) => {
    try {

        const informacaoPessoal = await Repositorio.informacoesPessoais.Dominio.InformacaoPessoal.findOne({
            email: email
        });
        
        if (!informacaoPessoal) {
            throw new Handler.HandlerError(404, 'Email não registrado')
        }

        const cliente = await Repositorio.clientes.Dominio.Cliente.findOne({
            informacaoPessoal: informacaoPessoal._id
        }).populate(['informacaoPessoal', 'endereco']);

        if(Extension.EhNuloOuVazio(cliente)) {
            throw new Handler.HandlerError(404, 'Email não registrado')
        }

        return cliente;
    } catch (error) {
        throw error;
    }
}