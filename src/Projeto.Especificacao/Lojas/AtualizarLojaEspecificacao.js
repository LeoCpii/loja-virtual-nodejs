const Repositorio = require('../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Storage = require('./../../Projeto.ServicoExterno/Firebase/storage');
const File = require('./../../shared/services/File.service');

exports.executar = async (lojaId, params, loja) => {
    if (params['tema.foto']) {
        const caminho = await Storage.uploadToFireBase(params['tema.foto'], [loja, 'perfil']);

        File.exclude(`${params['tema.foto'].name}/`);

        params = { ...params, ['tema.foto']: caminho };
    }

    await Repositorio.lojas.Fabrica.atualizar(lojaId, params);
}