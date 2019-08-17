/*
* Imports Dependencies
*/
const Handler = require('./../../shared/services/handler.service');
const Especificacao = require('./../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
   
        const cliente = await Especificacao.clientes.criar.executar(req.body)
        
        const mensagem = Handler.success('Cliente cadastrado com sucesso', cliente);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        return res.status(error.status).send(error);
    }
}