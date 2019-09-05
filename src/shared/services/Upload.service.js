const fs = require("fs");

exports.upload = (path, file) => {
  fs.writeFileSync(path, file, { encoding: "base64" }, function(err) {
    if (err) {
      console.error(err)
    }
    console.error('err')
  });
};

exports.gerenatePath = (...args) => {  
  const paths = {
      firebase: '',
      server: './src/assets/images/'
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