const express = require('express');
const router = express.Router();
const CasoDeUso = require('../../../Projeto.IoC/InjecoesDependencia/CasoDeUsoInjecaoDependencia');
const auth = require('../../../Projeto.API/auth/auth.service');

/*
* GET
*/
router.get('/:CEP', CasoDeUso.objetoValor.endereco.obterPorCEP.executar);

module.exports = router;