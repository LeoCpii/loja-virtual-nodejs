const mongoose = require('../../../../Projeto.API/Configuracao/database');

/*
* Model - Produto
*/
const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
    },
    slug: {
        type: String,
    },
    descricao: {
        type: String,
        required: [true, 'Descrição é obrigatória'],
    },
    valor: {
        type: Number,
        required: [true, 'Valor é obrigatório'],
    },
    promocao: {
        type: Number,
        default: 0
    },
    quantidade: {
        type: Number,
        required: [true, 'Quantidade é obrigatória'],
    },
    status: {
        type: Boolean,
        required: [true, 'Status é obrigatório'],
    },
    destaque: {
        type: Boolean,
        default: false
    },
    fotos: [{
        type: String
    }],
    detalhes: [{
        type: Object,
        nome: {
            type: Number,
            required: [true, 'Nome do detalhe é obrigatório']
        },
        valores: [
            {
                valor: {
                    type: Number,
                    required: [true, 'Valor do detalhe é obrigatório']
                }
            }
        ]
    }]
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = { Produto };