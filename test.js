'use strict';

var fs = require('fs');

var test = require('tape');
var readFile = require('require-main')();

test('fsReadFilePromise()', function(t) {
  var behaviors = [
    'should read a file.',
    'should be rejected with an error.',
    'should accept an option object.'
  ];

  t.plan(behaviors.length);

  readFile('./package.json')
  .then(function(actual) {
    fs.readFile('./package.json', function(err, expected) {
      if (err) {
        t.error(err);
        return;
      }
      t.equal(actual.toString(), expected.toString(), behaviors[0]);
    });
  });

  readFile('./bower.json')
  .catch(function(err) {
    t.equal(err.code, 'ENOENT', behaviors[1]);
  });

  readFile('./package.json', {encoding: 'foo'})
  .catch(function(err) {
    t.deepEqual(err, new Error('Unknown encoding: foo'), behaviors[2]);
  });
});
