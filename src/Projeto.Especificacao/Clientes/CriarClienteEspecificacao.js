const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Handler = require('./../../shared/services/handler.service');
const Extension = require('./../../shared/services/Extension.service');

exports.executar = async (cliente) => {
    try {

        const jaExiste = await Repositorio.informacoesPessoais.Dominio.InformacaoPessoal.findOne({ email: cliente.informacaoPessoal.email });

        if (!Extension.EhNuloOuVazio(jaExiste)) {
            throw {
                status: 422,
                message: 'Email já cadastrado'
            }
        }

        const endereco = await Repositorio.enderecos.Fabrica.criar(cliente.endereco);

        if (!Handler.isSuccess(endereco)) {
            throw endereco;
        }
        
        const informacaoPessoal = await Repositorio.informacoesPessoais.Fabrica.criar(cliente.informacaoPessoal);

        if (!Handler.isSuccess(informacaoPessoal)) {
            throw informacaoPessoal;
        }

        const newCliente = await Repositorio.clientes.Fabrica.criar(endereco, informacaoPessoal);

        if (!Handler.isSuccess(newCliente)) {
            throw newCliente;
        }

        return newCliente;
    } catch (error) {
        return error;
    }
}