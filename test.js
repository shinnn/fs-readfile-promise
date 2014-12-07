'use strict';

var test = require('tape');
var readFile = require('./');

test('fsReadFilePromise()', function(t) {
  t.plan(8);

  readFile('.gitattributes').then(function(actual) {
    t.deepEqual(actual, new Buffer('* text=auto\n'), 'should read a file.');
  });

  readFile('.gitattributes', 'utf8').then(function(actual) {
    t.equal(actual, '* text=auto\n', 'should reflect encoding to the result.');
  });

  readFile('bower.json', null).catch(function(err) {
    t.equal(err.code, 'ENOENT', 'should be rejected when the file doesn\'t exist.');
  });

  readFile('node_modules', undefined).catch(function(err) {
    t.equal(err.code, 'EISDIR', 'should be rejected when it tries to read a directory.');
  });

  t.throws(
    readFile.bind(null, true),
    /TypeError.*string/,
    'should throw a type error when the path isn\'t a string.'
  );

  t.throws(
    readFile.bind(null, '.gitattributes', {encoding: 'foo'}),
    /Unknown encoding: foo/,
    'should throw an error when the encoding is not supported.'
  );

  t.throws(
    readFile.bind(null, '.gitattributes', true),
    /TypeError.*Bad arguments/,
    'should throw an error when the second argument is not a string or an object.'
  );

  t.throws(
    readFile.bind(null),
    /TypeError.*string/,
    'should throw a type error when it takes no arguments.'
  );
});
