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
app.listen(port, '192.168.0.23', function () {
    console.log('*****************************');
    console.log(`evironments - ${process.env.NODE_ENV}`);
    console.log(`app listening on port ${port}`);
    console.log('*****************************');
})