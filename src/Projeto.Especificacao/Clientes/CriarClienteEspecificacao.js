const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../shared/services/handler.service');
const Extension = require('./../../shared/services/Extension.service');

exports.executar = async (cliente) => {
    try {
        const jaExiste = await Repositorio.informacoesPessoais.Dominio.InformacaoPessoal.findOne({ email: cliente.informacaoPessoal.email });

        if (!Extension.EhNuloOuVazio(jaExiste)) {
            throw new Handler.HandlerError(422, 'Email já cadastrado')
        }

        const endereco = await Repositorio.enderecos.Fabrica.criar(cliente.endereco);
        const informacaoPessoal = await Repositorio.informacoesPessoais.Fabrica.criar(cliente.informacaoPessoal);
        const newCliente = await Repositorio.clientes.Fabrica.criar(endereco, informacaoPessoal);

        return newCliente;
    } catch (error) {
        throw error;
    }
}