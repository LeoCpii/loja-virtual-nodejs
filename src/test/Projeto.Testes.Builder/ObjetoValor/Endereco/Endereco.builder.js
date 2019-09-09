const mock = {
    pais: 'Brasil',
    estado: 'Rio de Janeiro',
    cidade: 'Duque de Caxias',
    bairro: 'Vila Leopoldina',
    rua: 'Catete',
    numero: '3757',
    complemento: 'Casa 2',
    cep: '25050230'
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