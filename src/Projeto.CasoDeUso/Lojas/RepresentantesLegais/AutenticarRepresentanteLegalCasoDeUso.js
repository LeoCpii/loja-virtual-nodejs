/*
* Imports Dependencies
*/
const Handler = require('./../../../shared/services/handler.service');
const Especificacao = require('./../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');
const auth = require('./../../../Projeto.API/auth/auth.service');

exports.executar = async (req, res, next) => {
    try {

        const {
            email, senha
        } = req.body
        
        const representante = await Especificacao.lojas.representanteLegal.obterPorEmail.executar(email);

        const senhaIgual = senha && senha === representante.informacaoPessoal.senha ? true : false;
       
        if (!representante || !senhaIgual) {
            throw new Handler.HandlerError(404, 'Email ou senha inválidos')
        }
        
        const token = await auth.generateToken({
            unique: representante._id,
            email: representante.informacaoPessoal.email,
            nome: representante.informacaoPessoal.nome,
            loja: representante.loja.slug,
        })

        const mensagem = Handler.success('Usuário logado', token);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error);
        return res.status(mensagem.status).send(mensagem);
    }
}