const mongoose = require('../../../Projeto.API/Configuracao/database');

/*
* Model - Categoria
*/
const CategoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
    },
    descricao: {
        type: String,
        required: [true, 'Descrição é obrigatória'],
    },
    cor: {
        type: String,
        required: [true, 'Cor é obrigatória'],
    },
    produtos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    }],
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = { Categoria };