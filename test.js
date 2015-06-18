'use strict';

const test = require('tape');
const readFile = require('.');

test('fsReadFilePromise()', t => {
  t.plan(8);

  readFile('.gitattributes').then(actual => {
    t.deepEqual(actual, new Buffer('* text=auto\n'), 'should read a file.');
  });

  readFile('.gitattributes', 'utf8').then(actual => {
    t.equal(actual, '* text=auto\n', 'should reflect encoding to the result.');
  });

  readFile('bower.json', null).catch(err => {
    t.equal(err.code, 'ENOENT', 'should be rejected when the file doesn\'t exist.');
  });

  readFile('node_modules', undefined).catch(err => {
    t.equal(err.code, 'EISDIR', 'should be rejected when it tries to read a directory.');
  });

  t.throws(
    () => readFile(true),
    /TypeError.*string/,
    'should throw a type error when the path isn\'t a string.'
  );

  t.throws(
    () => readFile('.gitattributes', {encoding: 'foo'}),
    /Unknown encoding: foo/,
    'should throw an error when the encoding is not supported.'
  );

  t.throws(
    () => readFile('.gitattributes', true),
    /TypeError.*got boolean instead/,
    'should throw a type error when the second argument is not a string or an object.'
  );

  t.throws(
    readFile,
    /TypeError.*string/,
    'should throw a type error when it takes no arguments.'
  );
});
