/*
* Imports Dependencies
*/
const Handler = require('../../../shared/services/handler.service');
const Especificacao = require('../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');

exports.executar = async (req, res, next) => {
    try {
        const categorias = await Especificacao.lojas.categorias.obter.executar();
        
        const mensagem = Handler.success('Categorias encontradas', categorias);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        return res.status(error.status).send(error);
    }
}