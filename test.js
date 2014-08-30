'use strict';

var test = require('tape');
var readFile = require('require-main')();

test('fsReadFilePromise()', function(t) {
  var specs = [
    'should read a file.',
    'should be rejected with an error.',
    'should accept an option object.'
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
    t.deepEqual(err, new Error('Unknown encoding: foo'), specs[2]);
  });
});
