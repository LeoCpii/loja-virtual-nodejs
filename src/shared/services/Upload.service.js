const fs = require("fs");

exports.upload = (path, file) => {
  fs.writeFileSync(path, file, { encoding: "base64" }, function(err) {
    if (err) {
      console.log("writeFile error: ", err);
    }
    console.log("The file was saved!");
  });
};

exports.gerenatePath = (...args) => {  
  const paths = {
      firebase: '',
      server: './src/assets/images/'
  }
  paths.server += `${args[args.length-1]}/`;
  args.map(item => {
    paths.firebase +=  `${item}/`;
  });

  paths.firebase = paths.firebase.substring(0, paths.firebase.length-1)  

  return paths;
};
