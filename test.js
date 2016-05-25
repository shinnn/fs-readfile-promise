'use strong';

const test = require('tape');
const readFile = require('.');

test('fsReadFilePromise()', t => {
  t.plan(8);

  readFile('.gitattributes').then(actual => {
    t.deepEqual(actual, new Buffer('* text=auto\n'), 'should read a file.');
  });

  readFile('.gitattributes', 'utf8').then(actual => {
    t.strictEqual(actual, '* text=auto\n', 'should reflect encoding to the result.');
  });

  readFile('bower.json', null).catch(err => {
    t.strictEqual(err.code, 'ENOENT', 'should be rejected when the file doesn\'t exist.');
  });

  readFile('node_modules', undefined).catch(err => {
    t.strictEqual(err.code, 'EISDIR', 'should be rejected when it tries to read a directory.');
  });

  readFile(true).catch(err => {
    t.strictEqual(err.name, 'TypeError', 'should throw a type error when the path isn\'t a string.');
  });

  readFile('.gitattributes', {encoding: 'foo'}).catch(err => {
    t.strictEqual(
      err.message.includes('Unknown encoding: foo'),
      true,
      'should throw an error when the encoding is not supported.'
    );
  });

  readFile('.gitattributes', true).catch(err => {
    t.strictEqual(
      err.message.includes('got boolean instead'),
      true,
      'should throw a type error when the second argument is not a string or an object.'
    );
  });

  readFile().catch(err => {
    t.strictEqual(err.name, 'TypeError', 'should throw a type error when it takes no arguments.');
  });
});
