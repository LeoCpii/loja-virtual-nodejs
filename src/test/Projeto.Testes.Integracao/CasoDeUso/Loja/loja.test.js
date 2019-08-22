const criarLoja = require('../../../../Projeto.Especificacao/Lojas/CriarLojaEspecificacao');
const mock = require('../../../Projeto.Testes.Builder/Loja/loja.builder')

test('Deve criar um cliente', async () => {
    const loja = await criarLoja.executar(mock.loja);
    expect(loja).toHaveProperty('_id');
});
