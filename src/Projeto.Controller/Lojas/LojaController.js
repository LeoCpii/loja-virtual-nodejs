const express = require('express');
const router = express.Router();
const CasoDeUso = require('../../Projeto.IoC/InjecoesDependencia/CasoDeUsoInjecaoDependencia');
const auth = require('../../Projeto.API/auth/auth.service');

/*
* POST
*/
router.post('/register', CasoDeUso.loja.criar.executar);

/*
* GET
*/
router.get('', auth.autorize, CasoDeUso.loja.obter.executar);

/*
* PUT
*/
router.put('/update', auth.autorize, CasoDeUso.loja.atualizar.executar);

module.exports = router;