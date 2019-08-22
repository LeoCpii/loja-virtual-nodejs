const criarCliente = require('./../../../../Projeto.Especificacao/Clientes/CriarClienteEspecificacao');
const mock = require('./../../../Projeto.Testes.Builder/Clientes/cliente.builder')

test('Deve criar um cliente', async () => {
    const clienteCriado = await criarCliente.executar(mock.cliente);
    expect(clienteCriado).toHaveProperty('_id');
});
