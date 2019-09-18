const mongoose = require('mongoose');
const config = require('./../appsettings')

mongoose.connect(config.connectionString_DEV, {useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false})
.catch(erro => {
    console.error('Error database:', erro);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;