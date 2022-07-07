/*
takes in two command line arguments:(1) a URL, (2) a local file path.
Downloads the resource at the URL to the local path. Upon completion, it prints out a message like "Downloaded and saved 1235 bytes to ./index.html."
*/
const request = require('request');
const fs = require('fs');

const url = process.argv[2]
const localPath = process.argv[3]
console.log("URL entered: ", url)
console.log("filepath entered: ", localPath)

// filesize info
const fileStat = function (path, doneFunction) {
  fs.stat(path, (err, stats) => {
    if (err) {
      console.log(`File doesn't exist.`);
    } else {
      doneFunction(stats)
    }
  });
}
const completionMessage = (data) => {
  console.log(`Downloaded and saved ${data.size} bytes to ${localPath}`)
};

request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  if (error) {
    console.log('URL error. Nothing written to file.')

  } else {
    // // INCOMPLETE CODE to check if file exists and ask to overwrite
    // fs.stat(localPath, function(err, stat) {
    //   if (err == null) {
    //     console.log('File already exists. overwriting');
    //   } else if (err.code === 'ENOENT') {
    //     // file does not exist
    //   } else {
    //     console.log('Some other error: ', err.code);
    //   }
    // });

    fs.writeFile(localPath, body, err => {
      if (err) {
        console.error(err);
        console.log('Invalid file path. Nothing written to file.')
      } else {
        fileStat(localPath, completionMessage)
      }
    });
  }
});



