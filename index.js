'use strict';

var fs = require('graceful-fs');

var ES6Promise = global.Promise || require('es6-promise').Promise;

module.exports = function fsReadFilePromise() {
  var args = [].slice.call(arguments);
  return new ES6Promise(function(resolve, reject) {
    fs.readFile.apply(fs, args.concat(function(err, buf) {
      if (err) {
        reject(err);
        return;
      }
      resolve(buf);
    }));
  });
};
