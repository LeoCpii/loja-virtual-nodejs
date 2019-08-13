/*
* Imports Dependencies
*/
const Handler = require('./../../shared/services/handler.service');
const Especificacao = require('./../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
   
        const cliente = await Especificacao.clientes.criar.executar(req.body)
        
        if (!Handler.isSuccess(cliente)) {
           throw cliente;
        };
        
        const mensagem = Handler.success('Cliente cadastrado com sucesso', cliente);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error);
        return res.status(mensagem.status).send(mensagem);
    }
}