const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../Projeto.IoC/InjecoesDependencia/ControllerInjecaoDependencia');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:4201', 'http://localhost:4200', 'http://10.252.1.68:4201', 'http://10.252.1.68:4200']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));


// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })

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
