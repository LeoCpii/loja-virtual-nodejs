const Mail = require('./../services/SendMail.service');

exports.HandlerError =
     class HandlerError {
          constructor(status, message) {
               this.status = status;
               this.message = message;
          }
     }

exports.success = (message, data = '') => {
     const body = {
          status: 200,
          message: message,
          description: data
     }

     return body;
}

exports.badRequest = (message) => {
     const errBody = {
          status: 400,
          message: 'Erro na requisição',
          description: message
     }

     return errBody;
}

exports.notAuthException = (message) => {
     const errBody = {
          status: 401,
          message: 'Usuário não autorizado',
          description: message
     }

     return errBody;
}

exports.forbidden = (message) => {
     const errBody = {
          status: 403,
          message: 'Acesso restrito',
          description: message
     }

     return errBody;
}

exports.notFoundException = (message) => {
     const errBody = {
          status: 404,
          message: 'Recurso não encontrado',
          description: message
     }

     return errBody;
}

exports.businessRuleException = (regra) => {
     const errBody = {
          status: 422,
          message: 'Regra de negócio exception',
          description: regra
     }

     return errBody;
}

exports.internalException = (err) => {

     const isObject = typeof err === "object";

     const errBody = {
          status: 500,
          message: 'Erro interno',
          description: process.env.NODE_ENV !== 'development'
               ? 'Oops, tivemos um problema! Entre em contato ou tente novamente mais tarde'
               : isObject ? String(err) : err
     }

     if (process.env.NODE_ENV !== 'development') {
          const objMail = {
               to: 'leogoncalves.contato@gmail.com',
               subject: '***LOG***',
               template: 'log',
               content: { error: err },
          };

          Mail.sendMail(objMail)
     }
     return errBody;
}

exports.isSuccess = (response) => {

     if (!response) {
          return true;
     };

     const statusDeErro = [400, 401, 404, 422, 500];
     let existeStatusErro = false;
     let existeMensagem = false;

     existeMensagem = response.message ? true : false;

     if (response.status) {
          existeStatusErro = statusDeErro.indexOf(response.status) === -1 ? false : true;
     }

     return !existeMensagem && !existeStatusErro;
}

exports.errorStatus = (response) => {
     switch (response.status) {
          case 400:
               return this.badRequest(response.message);
          case 401:
               return this.notAuthException(response.message);
          case 403:
               return this.forbidden(response.message);
          case 404:
               return this.notFoundException(response.message);
          case 422:
               return this.businessRuleException(response.message);
          default: {
               return this.internalException(response);
          }
     }
}