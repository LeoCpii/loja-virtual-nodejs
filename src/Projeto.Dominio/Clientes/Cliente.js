const mongoose = require('../../Projeto.API/Configuracao/database');

/*
* Model - Cliente
*/
const ClienteSchema = new mongoose.Schema({
    informacaoPessoal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InformacaoPessoal',
        required: [true, 'Informação pessoal é obrigatória'],
    },
    endereco:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Endereco',
        required: [true, 'Endereço é obrigatório'],
    },
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = { Cliente };