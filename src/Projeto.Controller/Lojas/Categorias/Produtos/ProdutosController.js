const express = require('express');
const router = express.Router();
const CasoDeUso = require('../../../../Projeto.IoC/InjecoesDependencia/CasoDeUsoInjecaoDependencia');
const auth = require('../../../../Projeto.API/auth/auth.service');

/*
* POST
*/
router.post('/register', auth.autorize, CasoDeUso.loja.categoria.produto.criar.executar);

/*
* GET
*/
router.get('', auth.autorize, CasoDeUso.loja.categoria.produto.obter.executar);
router.get('/:slug', auth.autorize, CasoDeUso.loja.categoria.produto.obterPorSlug.executar);

module.exports = router;