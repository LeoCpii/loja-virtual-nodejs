const mongoose = require('../../Projeto.API/Configuracao/database');

/*
* Model - Loja
*/
const LojaSchema = new mongoose.Schema({
    razaoSocial: {
        type: String,
        required: [true, 'Razão social é obrigatória'],
    },
    cnpj: {
        type: String,
        minlength: [14, 'CNPJ inválido'],
        maxlength: [14, 'CNPJ inválido'],
        required: [true, 'Email é obrigatório'],
    },
    foto: {
        type: String,
    },
    categorias: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
    }],
    endereco:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Endereco',
        required: [true, 'Endereço é obrigatório'],
    },
    representanteLegal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RepresentanteLegal',
        required: [true, 'Informação pessoal é obrigatória'],
    },
});

const Loja = mongoose.model('Loja', LojaSchema);

module.exports = { Loja };