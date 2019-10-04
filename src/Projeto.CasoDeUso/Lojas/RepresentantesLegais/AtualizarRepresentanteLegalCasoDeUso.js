/*
 * Imports Dependencies
 */
const Handler = require("./../../../shared/services/handler.service");
const Especificacao = require("./../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia");
const Utils = require("./../../../shared/services/Utils.service");

exports.executar = async (req, res, next) => {
  try {
    const lojaAtual = await Utils.lojaAtual(req.header("x-access-token"));


    const representante = await Especificacao.lojas.representanteLegal.obterPorEmail.executar(
      lojaAtual.email
    );
    
    await Especificacao.lojas.representanteLegal.atualizar.executar(
      representante._id,
      req.body
    );

    const mensagem = Handler.success("Representate atualizado com sucesso");
    return res.status(mensagem.status).send(mensagem);
  } catch (error) {
    const mensagem = Handler.errorStatus(error);
    return res.status(mensagem.status).send(mensagem);
  }
};
