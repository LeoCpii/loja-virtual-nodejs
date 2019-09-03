const keyFilename = './firebase.json'; //replace this with api key file
const projectId = 'loja-virtual-fireapp' //replace with your project id
const bucketName = `${projectId}.appspot.com`;
const Handler = require('./../../shared/services/handler.service');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId,
    keyFilename
});

const bucket = storage.bucket(bucketName);
const uploadTo = `evidencia - grafico reserva.png`;

exports.upload = image => {
    try {
        const gcFile = bucket.file(image);
        gcFile.exists().then(jaExiste => {
            if (jaExiste) {
                console.log(jaExiste)
                return;
            }
            
            bucket.upload = (err, file) => {
                if (err) {
                    console.log('deu erro', err);
                    return;
                }
                return createPublicFileURL(image);
            };
        });
    } catch (error) {
        throw error;
    }
}

createPublicFileURL = storageName => {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;
}