/*
* Imports Dependencies
*/
const Handler = require('../../../../shared/services/handler.service');
const Especificacao = require('../../../../Projeto.IoC/InjecoesDependencia/EspecificacaoInjecaoDependencia');
const Mail = require('./../../../../shared/services/SendMail.service');

exports.executar = async (req, res, next) => {
    try {
        const produto = await Especificacao.lojas.categorias.produtos.criar.executar(req.body)

        const objMail = {
            to: 'leogoncalves.contato@gmail.com',
            subject: 'Novo produto',
            template: 'newProduct',
            content: {
                produto: {
                    nome: produto.nome,
                    descricao: produto.descricao,
                    valor: produto.valor
                },
            },
        };

        Mail.sendMail(objMail);

        const mensagem = Handler.success('Produto cadastrado com sucesso', produto);
        return res.status(mensagem.status).send(mensagem);
    } catch (error) {
        const mensagem = Handler.errorStatus(error)
        return res.status(mensagem.status).send(mensagem);
    }
}