const express = require('express');
const router = express.Router();
const CasoDeUso = require('../../../Projeto.IoC/InjecoesDependencia/CasoDeUsoInjecaoDependencia');
const auth = require('../../../Projeto.API/auth/auth.service');

/*
* POST
*/
router.post('/register', auth.autorize, CasoDeUso.loja.categoria.criar.executar);

/*
* GET
*/
router.get('', auth.autorize, CasoDeUso.loja.categoria.obter.executar);
router.get('/:slug', auth.autorize, CasoDeUso.loja.categoria.obterPorSlug.executar);

/*
* PUT
*/
router.put('/update/:slug', auth.autorize, CasoDeUso.loja.categoria.atualizar.executar);

/*
* DELETE
*/
router.delete('/:slug', auth.autorize, CasoDeUso.loja.categoria.excluir.executar);

module.exports = router;