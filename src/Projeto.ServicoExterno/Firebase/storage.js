const keyFilename = './firebase.json'; //replace this with api key file
const projectId = 'loja-virtual-fireapp'; //replace with your project id
const bucketName = `${projectId}.appspot.com`;
const { Storage } = require('@google-cloud/storage');
const File = require('../../shared/services/File.service');

const storage = new Storage({
  projectId,
  keyFilename
});

const bucket = storage.bucket(bucketName);
// const uploadTo = `evidencia - grafico reserva.png`;

exports.uploadToFireBase = async (foto) => {
  const path = File.gerenatePath('produtos', foto.name);
  const base64Data = foto.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  File.upload(path.server, base64Data);
  
  return new Promise((resolve, reject) => {
    bucket.upload(path.server, {
      destination: path.firebase,
      public: true
    }, (err, file) => {
      if (err) {
        reject(err);
      }
      else {
        const newUrl = createPublicFileURL(path.firebase);
        resolve(newUrl);
      }
    });
  });
};

exports.deleteToFireBase = (pathFirebase) => {

  const file = bucket.file(pathFirebase)

  file.delete().catch(err => {
    console.log('erro: ', err);
  });

};

function createPublicFileURL(storageName) {
  return `http://storage.googleapis.com/${bucketName}/${storageName}`;
}
