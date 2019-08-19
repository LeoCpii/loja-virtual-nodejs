const mockCliente = {
    informacaoPessoal: {
        nome: 'Leonardo',
        sobrenome: 'Gonçalves',
        foto: 'https://img.ibxk.com.br/2015/08/27/27151441599410.jpg?w:1040',
        dataNascimento: '1997-04-08',
        cpf: '14820696793',
        sexo: 1,
        email: 'leogoncalves.contato@gmail.com',
        senha: 'ASD123456789'
    },
    endereco: {
        pais: 'Brasil',
        estado: 'Rio de Janeiro',
        cidade: 'Duque de Caxias',
        bairro: 'Vila Leopoldina',
        rua: 'Catete',
        numero: 3757,
        complemento: 'Casa 2',
        cep: 25050230
    }
}

module.exports = {
    cliente: mockCliente
}