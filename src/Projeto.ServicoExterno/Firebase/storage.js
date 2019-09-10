const keyFilename = "./firebase.json"; //replace this with api key file
const projectId = "loja-virtual-fireapp"; //replace with your project id
const bucketName = `${projectId}.appspot.com`;
const Handler = require("./../../shared/services/handler.service");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId,
  keyFilename
});

const bucket = storage.bucket(bucketName);
// const uploadTo = `evidencia - grafico reserva.png`;

exports.uploadToFireBase = (pathServer, pathFirebase) => {
  bucket.upload(pathServer, {
    destination: pathFirebase,
    public: true
  }, function (err, file) {
    if (err) {
      console.log("erro: ", err);
      return false;
    }
  });
  const newUrl = createPublicFileURL(pathFirebase);
  return newUrl;
};

exports.deleteToFireBase = (pathFirebase) => {

  const file = bucket.file(pathFirebase)

  file.delete().catch(err => {
    console.log("erro: ", err);
  });

};

function createPublicFileURL(storageName) {
  return `http://storage.googleapis.com/${bucketName}/${storageName}`;
}
