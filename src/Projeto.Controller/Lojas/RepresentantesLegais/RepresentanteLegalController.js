const express = require('express');
const router = express.Router();
const CasoDeUso = require('../../../Projeto.IoC/InjecoesDependencia/CasoDeUsoInjecaoDependencia');
const auth = require('../../../Projeto.API/auth/auth.service');

/*
* POST
*/
router.post('/auth', CasoDeUso.loja.representanteLegal.auth.executar);

/*
* GET
*/
router.get('', auth.autorize, CasoDeUso.loja.representanteLegal.obter.executar);

module.exports = router;