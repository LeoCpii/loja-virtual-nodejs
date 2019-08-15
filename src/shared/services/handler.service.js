
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
     const errBody = {
          status: 500,
          message: 'Erro interno',
          description: err.message
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
     if (response.status) {
          if (response.status === 422) {
               return this.businessRuleException(response.message);
          } else if (response.status === 401) {
               return this.notAuthException(response.message);
          } else if (response.status === 404) {
               return this.notFoundException(response.message);
          } else if (response.status === 400) {
               return this.badRequest(response.message);
          }
     } else {
          return this.internalException(response);
     }
}

