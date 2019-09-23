const mongoose = require('mongoose');
const fs = require('fs')
const dotenv = require('dotenv');
const envConfig = dotenv.parse(
    process.env.NODE_ENV && process.env.NODE_ENV.includes('test') ?
        fs.readFileSync('.env.testing') :
        fs.readFileSync('.env')
)
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

mongoose.connect(process.env.DATA_BASE, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false })
    .catch(erro => {
        console.error('Error database:', erro);
    });

mongoose.Promise = global.Promise;

module.exports = mongoose;