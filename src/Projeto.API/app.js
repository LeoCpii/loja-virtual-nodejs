const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../Projeto.IoC/InjecoesDependencia/ControllerInjecaoDependencia');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('', controller.health); 
app.use('/cliente', controller.cliente);
app.use('/loja', controller.loja);
app.use('/categoria', controller.categoria);
app.use('/produto', controller.produto);

module.exports = app;