
const assert = require('assert');
const formatter = require('../../../../../shared/services/Formatter.service');

describe('Mascara Moeda: R$ 0,00', () => {
    it('String vazio', done => {
        const value = formatter.currencyMask('');
        assert.equal(value, 'R$ 0,00');
        done();
    });
    it('String zerado: R$ 0,00', done => {
        const value = formatter.currencyMask('0');
        assert.equal(value, 'R$ 0,00');
        done();
    });
    it('String zerado decimal ZUADO: 5,000.000', done => {
        const value = formatter.currencyMask('5,000.000');
        assert.equal(value, 'R$ 5.000,00');
        done();
    });
    it('String zerado decimal (.): 0.00', done => {
        const value = formatter.currencyMask('0.00');
        assert.equal(value, 'R$ 0,00');
        done();
    });
    it('String zerado decimal (,): 0,00', done => {
        const value = formatter.currencyMask('0,00');
        assert.equal(value, 'R$ 0,00');
        done();
    });
    it('String sem separador: 12', done => {
        const value = formatter.currencyMask('12');
        assert.equal(value, 'R$ 12,00');
        done();
    });
    it('String centavos (,): 0,10', done => {
        const value = formatter.currencyMask('0,10');
        assert.equal(value, 'R$ 0,10');
        done();
    });
    it('String centavos (.): 0.15', done => {
        const value = formatter.currencyMask('0.15');
        assert.equal(value, 'R$ 0,15');
        done();
    });
    it('String milhar sem formatacao: 10000', done => {
        const value = formatter.currencyMask('10000');
        assert.equal(value, 'R$ 10.000,00');
        done();
    });
    it('String com milhar (.): 13.000', done => {
        const value = formatter.currencyMask('13.000');
        assert.equal(value, 'R$ 13.000,00');
        done();
    });
    it('String com milhar (,): 14,000', done => {
        const value = formatter.currencyMask('14,000');
        assert.equal(value, 'R$ 14.000,00');
        done();
    });
    it('String com milhar (,) e decimal (.): 15,000.50', done => {
        const value = formatter.currencyMask('15,000.50');
        assert.equal(value, 'R$ 15.000,50');
        done();
    });
    it('String com milhar (.) e decimal (,): 16.000,32', done => {
        const value = formatter.currencyMask('16.000,32');
        assert.equal(value, 'R$ 16.000,32');
        done();
    });
    it('String formatado com milhar (.) e decimal (,): R$ 17.000,32', done => {
        const value = formatter.currencyMask('R$ 17.000,32');
        assert.equal(value, 'R$ 17.000,32');
        done();
    });
    it('String formatado com milhar (,) e decimal (.): R$ 17,000.32', done => {
        const value = formatter.currencyMask('R$ 17,000.32');
        assert.equal(value, 'R$ 17.000,32');
        done();
    });
    it('String com milhar (,) e decimal (.): 15,000.50', done => {
        const value = formatter.currencyMask('15,000.50');
        assert.equal(value, 'R$ 15.000,50');
        done();
    });
    it('Number DECIMAL: 18.12', done => {
        const value = formatter.currencyMask(18.12);
        assert.equal(value, 'R$ 18,12');
        done();
    });
    it('Number: 1900', done => {
        const value = formatter.currencyMask(1900);
        assert.equal(value, 'R$ 1.900,00');
        done();
    });
    it('Number VAZIO: 0', done => {
        const value = formatter.currencyMask(0);
        assert.equal(value, 'R$ 0,00');
        done();
    });
    it('Number dizima arredonda +: 4.4477777777777', done => {
        const value = formatter.currencyMask(4.4477777777777);
        assert.equal(value, 'R$ 4,45');
        done();
    });
    it('Number dizima arredonda -: 4.444444', done => {
        const value = formatter.currencyMask(4.444444);
        assert.equal(value, 'R$ 4,44');
        done();
    });
    it('Number VAZIO com decimal (.): 0.0', done => {
        const value = formatter.currencyMask(0.0);
        assert.equal(value, 'R$ 0,00');
        done();
    });
});