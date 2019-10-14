const Repositorio = require('../../../Projeto.IoC/InjecoesDependencia/RepositorioInjecaoDependencia');
const Storage = require('./../../../Projeto.ServicoExterno/Firebase/storage');
const File = require('./../../../shared/services/File.service');

exports.executar = async (id, params, loja) => {
    let data = { foto: '' }
    if (params.foto) {
        const caminho = await Storage.uploadToFireBase(params.foto, [loja, 'perfil']);

        File.exclude(`${params.foto.name}/`);

        data = { ...data, foto: caminho };
    }

    await Repositorio.informacoesPessoais.Fabrica.atualizar(data, id);
}