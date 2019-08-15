/*
* Imports Dependencies
*/
const Handler = require('./../../shared/services/handler.service');
const Especificacao = require('./../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');
const auth = require('./../../Projeto.API/auth/auth.service');

exports.executar = async (req, res, next) => {
    try {

        const {
            email, senha
        } = req.body
        
        const cliente = await Especificacao.clientes.obterPorEmail.executar(email);

        if (!Handler.isSuccess(cliente)) {
            throw cliente;
        };

        const senhaIgual = senha && senha === cliente.informacaoPessoal.senha ? true : false;
        if (!cliente || !senhaIgual) {
            throw {
                status: 404,
                message: 'Email ou senha inválidos'
            }
        }

        const token = await auth.generateToken({
            unique: cliente._id,
            email: cliente.informacaoPessoal.email,
            nome: cliente.informacaoPessoal.nome
        })

        const mensagem = Handler.success('Usuário logado', token);
        return res.status(mensagem.status).send(mensagem);

    } catch (error) {
        const mensagem = Handler.errorStatus(error);
        return res.status(mensagem.status).send(mensagem);
    }
}