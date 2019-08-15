const mongoose = require('../../../Projeto.API/Configuracao/database');

/*
* Model - RepresentanteLegal
*/
const RepresentanteLegalSchema = new mongoose.Schema({
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
    loja:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loja'
    },
});

const RepresentanteLegal = mongoose.model('RepresentanteLegal', RepresentanteLegalSchema);

module.exports = { RepresentanteLegal };