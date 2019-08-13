const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('../../shared/services/handler.service');

exports.executar = async (email) => {
    try {

        const informacaoPessoal = await Repositorio.informacoesPessoais.Dominio.InformacaoPessoal.findOne({
            email: email
        });
        
        const cliente = await Repositorio.clientes.Dominio.Cliente.findOne({
            informacaoPessoal: informacaoPessoal._id
        }).populate(['informacaoPessoal', 'endereco']);
        
        return cliente;
    } catch (error) {
        return error;
    }
}