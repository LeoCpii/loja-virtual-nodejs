const express = require('express');
const router = express.Router();
const CasoDeUso = require('../../Projeto.IoC/InjecoesDependencia/CasoDeUsoInjecaoDependencia');
const auth = require('../../Projeto.API/auth/auth.service');

/*
* POST
*/
router.post('/register', CasoDeUso.cliente.criar.executar);

module.exports = router;