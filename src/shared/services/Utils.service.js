const Auth = require('./../../Projeto.API/auth/auth.service').decodeToken;

exports.lojaAtual = async (header) => {
    const decoded = await Auth(header);

    return decoded;
}