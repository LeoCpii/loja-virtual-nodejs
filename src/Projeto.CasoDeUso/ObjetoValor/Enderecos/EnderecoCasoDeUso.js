/*
* Imports Dependencies
*/
const Handler = require('./../../../shared/services/handler.service');
const ServicoExterno = require('./../../../Projeto.ServicoExterno/ObterEndereco/ObterEnderecoServicoExterno');

exports.executar = async (req, res, next) => {
    try {
        const endereco = await ServicoExterno.obterEndereco(req.params.CEP);

        const mensagem = Handler.success('Endereco obtido com sucesso', endereco.data);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}