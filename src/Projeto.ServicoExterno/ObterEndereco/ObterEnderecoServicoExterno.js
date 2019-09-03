/*
* Imports Dependencies
*/
const ajax = require('../../shared/services/Ajax.service');
const config = require('../../shared/services/Config.service');
const Handler = require('./../../shared/services/handler.service');

exports.obterEndereco = async (cep) => {
    try {
        const url = config.API_CEP;
        const endereco = await ajax.get(`${url}${cep}/json`);
        return endereco;
    } catch (error) {
        throw new Handler.HandlerError(400, error.message);
    }
}