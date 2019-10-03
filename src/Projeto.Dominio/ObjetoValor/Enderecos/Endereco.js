const mongoose = require('../../../Projeto.API/Configuracao/database');

const PAISES = Object.freeze({
    Brasil: 0,
    Outros: 1
})

/*
* Model - Endereco
*/
const EnderecoSchema = new mongoose.Schema({
    pais: {
        type: Number,
        enum: [Object.values(PAISES)],
        required: [true, 'País é obrigatório'],
    },
    estado: {
        type: String,
        required: [true, 'Estado é obrigatório'],
    },
    cidade: {
        type: String,
        required: [true, 'Cidade é obrigatória'],
    },
    bairro: {
        type: String,
        required: [true, 'Bairro é obrigatório'],
    },
    rua: {
        type: String,
        required: [true, 'Rua é obrigatória'],
    },
    numero: {
        type: String,
        required: [true, 'Número é obrigatório'],
    },
    complemento: {
        type: String,
        required: [true, 'Complemento é obrigatório'],
    },
    cep: {
        type: String,
        maxlength: [8, 'Tamanho inválido de CEP'],
        minlength: [8, 'Tamanho inválido de CEP'],
        required: [true, 'CEP é obrigatório'],
    }
});

Object.assign(EnderecoSchema.statics, {
    PAISES,
});

const Endereco = mongoose.model('Endereco', EnderecoSchema);

module.exports = { Endereco, PAISES };