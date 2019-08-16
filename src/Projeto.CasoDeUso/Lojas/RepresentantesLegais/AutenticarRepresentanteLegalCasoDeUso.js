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
    
        if (!Handler.isSuccess(representante)) {
            throw representante;
        };

        const senhaIgual = senha && senha === representante.informacaoPessoal.senha ? true : false;
       
        if (!representante || !senhaIgual) {
            throw {
                status: 404,
                message: 'Email ou senha inválidos'
            }
        }
        
        const token = await auth.generateToken({
            unique: representante._id,
            email: representante.informacaoPessoal.email,
            nome: representante.informacaoPessoal.nome,
            loja: representante.loja._id,
        })

        const mensagem = Handler.success('Usuário logado', token);
        return res.status(mensagem.status).send(mensagem);

    } catch (error) {
        const mensagem = Handler.errorStatus(error);
        return res.status(mensagem.status).send(mensagem);
    }
}