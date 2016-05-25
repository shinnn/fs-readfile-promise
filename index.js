'use strict';

const fs = require('graceful-fs');

module.exports = function fsReadFilePromise(filePath, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, options, (err, buf) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(buf);
    });
  });
};
