exports.criar = (str) => {
    str = str.toLowerCase();
    str = str.replace(/\d+/g, '')
    str = str.replace(/_/g, '')
    str = str.replace(/[^\w\s]/gi, '')
    str = str.replace(/( )+/g, '-');

    if(str.substring(str.length-1, str.length) === '-') {
        return str.substring(0, str.length-1);
    }

    return str;
}