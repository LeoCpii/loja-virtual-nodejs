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
router.get('/:id', auth.autorize, CasoDeUso.loja.categoria.obterPorId.executar);

/*
* DELETE
*/
router.delete('/:id', auth.autorize, CasoDeUso.loja.categoria.excluir.executar);

module.exports = router;