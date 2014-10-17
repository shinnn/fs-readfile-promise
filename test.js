'use strict';

var test = require('tape');
var readFile = require('./');

test('fsReadFilePromise()', function(t) {
  var specs = [
    'should read a file.',
    'should be rejected with an error when the file doesn\'t exist.',
    'should accept an option object for fs.readFile.',
    'should be rejected with a type error when the path isn\'t a string.'
  ];

  t.plan(specs.length);

  readFile('./.gitignore')
  .then(function(actual) {
    t.equal(actual.toString(), 'node_modules\ncoverage\n', specs[0]);
  });

  readFile('./bower.json')
  .catch(function(err) {
    t.equal(err.code, 'ENOENT', specs[1]);
  });

  readFile('./.gitignore', {encoding: 'foo'})
  .catch(function(err) {
    t.equal(err.message, 'Unknown encoding: foo', specs[2]);
  });

  readFile(true)
  .catch(function(err) {
    t.equal(err.message, 'path must be a string', specs[3]);
  });
});
