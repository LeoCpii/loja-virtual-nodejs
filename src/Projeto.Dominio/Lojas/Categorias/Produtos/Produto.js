const mongoose = require('../../../../Projeto.API/Configuracao/database');

const STATUS = Object.freeze({
    Indisponivel: 0,
    Disponivel: 1
});

/*
* Model - Produto
*/
const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
    },
    descricao: {
        type: String,
        required: [true, 'Descrição é obrigatória'],
    },
    valor: {
        type: Number,
        required: [true, 'Valor é obrigatório'],
    },
    quantidade: {
        type: Number,
        required: [true, 'Quantidade é obrigatória'],
    },
    status: {
        type: Number,
        enum: [Object.values(STATUS)],
        required: [true, 'Status é obrigatório'],
    },
    destaque: {
        type: Boolean,
        default: false
    },
    promocao: {
        type: Number,
        default: 0
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

Object.assign(ProdutoSchema.statics, {
    STATUS,
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = { Produto, STATUS };