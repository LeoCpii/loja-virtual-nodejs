const express = require('express');
const router = express.Router();
const CasoDeUso = require('../../Projeto.IoC/InjecoesDependencia/CasoDeUsoInjecaoDependencia');

/*
* GET
*/
router.get('', CasoDeUso.health.verificarSaude.executar);

module.exports = router;