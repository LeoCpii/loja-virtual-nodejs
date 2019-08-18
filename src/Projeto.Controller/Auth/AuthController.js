const express = require('express');
const router = express.Router();
const CasoDeUso = require('../../Projeto.IoC/InjecoesDependencia/CasoDeUsoInjecaoDependencia');
const auth = require('../../Projeto.API/auth/auth.service');
/*
* GET
*/
router.get('', auth.autorize, CasoDeUso.auth.autenticar.executar);

module.exports = router;