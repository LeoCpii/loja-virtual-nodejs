exports.EhNuloOuVazio = (element) => {
    return (element === '' || element === null || element === undefined || element.length === 0) ? true : false;
}

exports.Aparar = (element) => {
    return element.trim();
}
