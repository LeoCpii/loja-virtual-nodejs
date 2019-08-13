const express = require('express');
const router = express.Router();
const executar = require('../../Projeto.IoC/InjecoesDependencia/CasoDeUsoInjecaoDependencia');
const auth = require('../../Projeto.API/auth/auth.service');

/*
* GET
*/
router.get('', executar.auth.autenticar.executar);

module.exports = router;