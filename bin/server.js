const fs = require('fs')
const dotenv = require('dotenv');
const envConfig = dotenv.parse(
    process.env.NODE_ENV === 'test' ?
        fs.readFileSync('.env.testing') :
        fs.readFileSync('.env')
)
for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

const app = require('./../src/Projeto.API/app');
const port = normalizaPort(process.env.PORT || '3000');
function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
app.listen(port, function () {
    console.log('*****************************');
    console.log(`evironments - ${process.env.NODE_ENV}`);
    console.log(`app listening on port ${port}`);
    console.log('*****************************');
})