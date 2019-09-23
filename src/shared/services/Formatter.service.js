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

        if (dot > -1 && comma > -1) {
            separator = dot > comma ? 'dot' : 'comma';
        }

        const isDecimal = separator === 'dot' || separator === 'comma';

        if (isDecimal) {
            if (separator === 'dot') {
                if (comma > -1) {
                    value = value.replace(',', '');
                }
            } else if (separator === 'comma') {
                value = value.replace('.', '');
                value = value.replace(',', '.');
            }
        } else {
            value = value.replace('.', '');
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