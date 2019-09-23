const mongoose = require('mongoose');

mongoose.connect(process.env.DATA_BASE, {useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false})
.catch(erro => {
    console.error('Error database:', erro);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;