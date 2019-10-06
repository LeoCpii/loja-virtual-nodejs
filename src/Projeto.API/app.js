const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../Projeto.IoC/InjecoesDependencia/ControllerInjecaoDependencia');
const app = express();

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use('', controller.health);
app.use('/auth', controller.auth);
app.use('/cliente', controller.cliente);
app.use('/loja', controller.loja);
app.use('/categoria', controller.categoria);
app.use('/produto', controller.produto);
app.use('/representanteLegal', controller.representanteLegal);
app.use('/endereco', controller.endereco);
app.use('/informacaoPessoal', controller.informacaoPessoal);

module.exports = app;