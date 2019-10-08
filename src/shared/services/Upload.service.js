const fs = require('fs');
const Mail = require('./../../shared/services/SendMail.service');

exports.upload = async (path, file) => {
  fs.writeFileSync(path, file, { encoding: 'base64' }, function(err) {
    if (err) {
      const objMail = {
        to: 'leogoncalves.contato@gmail.com',
        subject: 'Novo produto',
        template: 'registerStore',
        content: {
          token: err
        },
      };

      Mail.sendMail(objMail);
      console.error(err)
    }
    console.error('err')
  });
};

exports.gerenatePath = (...args) => {  
  const paths = {
      firebase: '',
      server: process.env.IMAGE_PATH 
  }
  paths.server += `${args[args.length-1]}/`;
  args.map(item => {
    paths.firebase +=  `${item}\/`;
  });

  paths.firebase = paths.firebase.substring(0, paths.firebase.length-1)  

  return paths;
};

exports.delete = (path) => {
  fs.unlink(path, function(err) {
    if (err) {
      console.error(err)
    }
  });
};