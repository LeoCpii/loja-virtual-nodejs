const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Extension = require('./../../shared/services/Extension.service');

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

        const cliente = await Repositorio.clientes.Dominio.Cliente.findOne({
            informacaoPessoal: informacaoPessoal._id
        }).populate(['informacaoPessoal', 'endereco']);

        if(Extension.EhNuloOuVazio(cliente)) {
            throw {
                status: 404,
                message: 'Email não registrado'
            }
        }

        return cliente;
    } catch (error) {
        return error;
    }
}