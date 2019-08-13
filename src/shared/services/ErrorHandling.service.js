exports.concatErrors = (errors) => {
    const arrErrors = [];

    for (var key in errors) {
        arrErrors.push({error: errors[key].message})
    }
    
    return arrErrors;
}