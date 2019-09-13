const numeral = require('numeral');

exports.currencyMask = (value) => {
    const data = {
        prefix: 'R$',
    };

    value = value || 0;
    const isNumber = typeof value === 'number';

    if (!isNumber) {
        let separator = '';
        const dot = value.lastIndexOf('.');
        const comma = value.lastIndexOf(',');
        console.log('-----------------')
        console.log('value: ', value)
        console.log('dot: ', dot)
        console.log('comma: ', comma)

        if (dot > -1 && comma > -1) {
            separator = dot > comma ? 'dot' : 'comma';
            console.log('separator: ', separator)
        }

        const isDecimal = separator === 'dot' || separator === 'comma';
        console.log('isDecimal: ', isDecimal)

        if (isDecimal) {
            if (separator === 'dot') {
                console.log('aqui: dot')
                if (comma > -1) {
                    value = value.replace(',', '');
                }
            } else if (separator === 'comma') {
                console.log('aqui: comma')
                value = value.replace('.', '');
                value = value.replace(',', '.');
            }
        } else {
            console.log('aqui: noDecimal')
            value = value.replace('.', '');
        }
        console.log('quase: ', value)
        value = getNumber(value);
    }
    console.log('newValue: ', value)
    console.log('-----------------')
    const v = parseFloat(value.toString()).toFixed(2);
    const r = v.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return `${data.prefix} ${r}`;
}

getNumber = (value) => {
    const myNumeral = numeral(value);
    var num = myNumeral.value();
    return num
}

/*
const numeral = require('numeral');

exports.currencyMask = (value) => {
    const data = {
        prefix: 'R$',
    };

    value = value || 0;
    const isNumber = typeof value === 'number';

    if (!isNumber) {
        const decimalDot = value.length - value.lastIndexOf('.') === 3;
        const decimalComma = value.length - value.lastIndexOf(',') === 3;

        const dot = value.length - value.lastIndexOf('.');
        const comma = value.length - value.lastIndexOf(',');

        const separator = dot > comma ? 'dot' : 'comma';

        const isDecimal = decimalDot || decimalComma;

        if (isDecimal) {
            if (decimalDot) {
                value = value.replace(',', '');
            } else if (decimalComma) {
                value = value.replace('.', '');
                value = value.replace(',', '.');
            }
        } else {
            console.log('antes: ', value)
            value = value.replace('.', '');
            console.log('depois: ', value)
        }
        value = getNumber(value);
    }

    const v = parseFloat(value.toString()).toFixed(2);
    const r = v.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return `${data.prefix} ${r}`;
}

getNumber = (value) => {
    const myNumeral = numeral(value);
    var num = myNumeral.value();
    return num
}
*/