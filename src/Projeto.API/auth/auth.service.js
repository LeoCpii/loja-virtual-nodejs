'use strict';
const jwt = require('jsonwebtoken');
const Handler = require('../../shared/services/handler.service');

exports.generateToken = async (data) => {
    return await jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    const data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.autorize = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.header('x-access-token');

    if (!token) {
        const error = {
            status: 401,
            message: 'Acesso restrito'
        }

        const mensagem = Handler.errorStatus(error);
        return res.status(mensagem.status).send(mensagem);
    } else {
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if(error) {
                const error = {
                    status: 401,
                    message: 'Token inválido'
                }
        
                const mensagem = Handler.errorStatus(error);
                return res.status(mensagem.status).send(mensagem);
            } else {
                next();
            }
        });
    }
}