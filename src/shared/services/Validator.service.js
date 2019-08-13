const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const telRegex = /(^\d{8,9}$)|(^$)/;
const dddRegex = /(^\d{1,2}$)|(^$)/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
const dateRegex = /^\d{4}\-\d{2}\-\d{2}$/;
const datetimeRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}\:\d{2}$/;
const monthRegex = /^\d{2}\/\d{4}/;
const cepRegex = /^[0-9]{5}-[\d]{3}$/;
const onlyNumberRegex = /^([0-9])*$/;
const colorRegex = /^#([a-zA-Z0-9-])*$/;

exports.isValidEmail = (value) => {
    return emailRegex.test(value);
}

exports.isValidDdd = (value) => {
    return dddRegex.test(value);
}

exports.isValidPhone = (value) => {
    return telRegex.test(value);
}

exports.isValidCpf = (value) => {
    return cpfRegex.test(value);
}

exports.isValidCnpj = (value) => {
    return cnpjRegex.test(value);
}

exports.isValidCnpjOrCpf = (value) => {
    return value == null ? false : value.length === 11 || value.length === 14;
}

exports.isValidDate = (value) => {
    return dateRegex.test(value);
}

exports.isValidDateTime = (value) => {
    return datetimeRegex.test(value);
}

exports.isValidMonth = (value) => {
    return monthRegex.test(value);
}

exports.isValidCep = (value) => {
    return cepRegex.test(value);
}

exports.isValidNumber = (value) => {
    return onlyNumberRegex.test(value);
}

exports.isValidColor = (color) => {
    return colorRegex.test(color);
}

exports.isValidEnum = (valeu, ienumerable) => {
    let isValid = false;

    for (var key in ienumerable) {
        if (ienumerable[key] === valeu) {
            isValid = true;
            break;
        }
    }

    return isValid;
}

exports.isValidAge = (value) => {
    const arrData = value.split('-');

    const ano_aniversario = arrData[0];
    const mes_aniversario = arrData[1];
    const dia_aniversario = arrData[2];

    const d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate()

    const idade = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        idade--;
    }

    return idade > 0 && idade < 100;
}