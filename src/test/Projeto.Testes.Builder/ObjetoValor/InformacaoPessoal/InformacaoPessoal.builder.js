const mock = {
    nome: 'Leonardo',
    sobrenome: 'Gonçalves',
    foto: "https://ped2018.com.br/media/palestrantes/merino.jpg",
    dataNascimento: '1997-04-08',
    cpf: '14820687623',
    sexo: 0,
    email: 'leo.contato@gmail.com',
    senha: 'ASD123456789'
}

getMock = (skeleton, value) =>  {
    let data = {};

    for (var key in mock) {
        const helper = key === skeleton ? value : mock[key];
        data = { ...data,  [key]: helper};
    }

    return data;
}

module.exports = {
    getMock: getMock
}