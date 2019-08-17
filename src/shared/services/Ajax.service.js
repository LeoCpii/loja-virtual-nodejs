const axios = require('axios');

exports.get = async (url) => {
    const result = await axios.get(url)
        .catch(err => {
            throw err;
        });
    return result
}