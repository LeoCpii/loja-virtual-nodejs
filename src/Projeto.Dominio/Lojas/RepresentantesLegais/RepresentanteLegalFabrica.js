const RegraDeNegocio = require('./RepresentanteLegalRegraDeNegocio');
const errorHandling = require('./../../../shared/services/ErrorHandling.service');
const Dominio = require('./RepresentanteLegal');

exports.criar = async (endereco, informacaoPessoal) => {

    const representanteLegal = await Dominio.RepresentanteLegal.create(
        { endereco, informacaoPessoal  }
    ).then().catch(e => {
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    await representanteLegal.save();

    return representanteLegal;
}

const validar = (representanteLegal) => {
    const validado = RegraDeNegocio.validar(RepresentanteLegal);
 
    return validado.length === 0 ? true : {
        status: 400,
        message: validado,
    }
}

exports.atualizar = async (representanteLegal) => {

    const idLoja = await Dominio.RepresentanteLegal.findOne();

    const attLoja = await Dominio.RepresentanteLegal.updateOne(
        { _id: idLoja._id },
        { $set: representanteLegal },
        { upsert: true }
    ).then().catch(e => {
        throw {
            status: 400,
            message: errorHandling.concatErrors(e.errors)
        }
    });

    return attLoja;
}