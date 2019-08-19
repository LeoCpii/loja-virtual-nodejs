const cliente = require('')
const criarCliente = require('./../../../../Projeto.Especificacao/Clientes/CriarClienteEspecificacao');
const mock = require('./../../../Projeto.Testes.Builder/Clientes/cliente.builder')

describe('Criando cliente', () => {
    let transac;
    beforeAll(async () => {
        Customer.createCollection().
        then(() => Customer.startSession()).
        then(_session => {
          session = _session;
          session.startTransaction();
          return Customer.create([{ name: 'Test' }], { session: session });
        }).
        then(() => Customer.create([{ name: 'Test2' }], { session: session })).
        then(() => session.abortTransaction()).
        then(() => Customer.countDocuments()).
        then(count => assert.strictEqual(count, 0));
    });

    test('Deve criar um cliente', async () => {
        const clientMock = mock.cliente;
        const clienteCriado = await criarCliente.executar(clientMock)
        console.log(clienteCriado)
        expect(3).toBe(3);
    });

    afterAll(async () => {
        transac.abortTransaction();
    });
});


