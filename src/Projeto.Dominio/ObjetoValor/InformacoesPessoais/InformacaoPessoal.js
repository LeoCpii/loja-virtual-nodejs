const mongoose = require('../../../Projeto.API/Configuracao/database');

const SEXO = Object.freeze({
    Masculino: 0,
    Feminino: 1,
    Outros: 2
})

/*
* Model - InformacaoPessoal
*/
const InformacaoPessoalSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
    },
    sobrenome: {
        type: String,
        required: [true, 'Sobrenome é obrigatório'],
    },
    foto: {
        type: String,
    },
    dataNascimento: {
        type: String,
        required: [true, 'Data de nascimento é obrigatória'],
    },
    cpf: {
        type: String,
        maxlength: [11, 'Tamanho inválido de CPF'],
        minlength: [11, 'Tamanho inválido de CPF'],
        required: [true, 'Cpf é obrigatório'],
    },
    sexo: {
        type: Number,
        enum: [Object.values(SEXO)],
        required: [true, 'Sexo é obrigatório'],
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        lowercase: true,
    },
    senha: {
        type: String,
        required: [true, 'Senha é obrigatória'],
    },
});

Object.assign(InformacaoPessoalSchema.statics, {
    SEXO,
});

const InformacaoPessoal = mongoose.model('InformacaoPessoal', InformacaoPessoalSchema);

module.exports = { InformacaoPessoal, SEXO };