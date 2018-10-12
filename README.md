# fs-readfile-promise

[![npm version](https://img.shields.io/npm/v/fs-readfile-promise.svg)](https://www.npmjs.com/package/fs-readfile-promise)
[![Build Status](https://travis-ci.org/shinnn/fs-readfile-promise.svg?branch=master)](https://travis-ci.org/shinnn/fs-readfile-promise)
[![Build status](https://ci.appveyor.com/api/projects/status/5sacvq0w9x7mwkwd?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/fs-readfile-promise)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/fs-readfile-promise.svg)](https://coveralls.io/github/shinnn/fs-readfile-promise?branch=master)

Promisified version of [`fs.readFile`][fs.readfile]

```javascript
const readFilePromise = require('fs-readfile-promise');

(async () => {
  const buffer = await readPromise('path/to/a/file');
  buffer.toString(); //=> '... file contents ...'
})();
```

Based on the principle of [*modular programming*](https://en.wikipedia.org/wiki/Modular_programming), this module has only one functionality [`readFile`][fs.readfile], unlike other Promise-based file system modules. If you'd like to use a bunch of other [`fs`](http://nodejs.org/api/fs.html) methods in the Promise way, choose other modules such as [q-io](https://github.com/kriskowal/q-io) and [promise-fs](https://github.com/octet-stream/promise-fs).

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install fs-readfile-promise
```

## API

```javascript
const readFilePromise = require('fs-readfile-promise');
```

### readFile(*path* [, *options*])

*path*: `string` `Buffer` `Uint8Array` `URL` `integer`  
*options*: `Object` ([fs.readFile] options) or `string` (encoding)  
Return: `Promise<Buffer|string>`

```javascript
(async () => {
  await readFilePromise('src.txt'); //=> <Buffer 48 69 2e>
  await readFilePromise('src.txt', 'utf8'); //=> 'Hi.'
  await readFilePromise('src.txt', {encoding: 'base64'}); //=> 'SGku'
})();
```

## Related projects

* [read-utf8-file](https://github.com/shinnn/read-utf8-file) — Promisified `fs.readFile` with automatic [BOM](https://unicode.org/faq/utf_bom.html) stripping, encoding validation and stringification
* [read-multiple-files](https://github.com/shinnn/read-multiple-files) — Read multiple files [Observable](https://github.com/tc39/proposal-observable) way

## License

[ISC License](./LICENSE) © 2017 - 2018 Shinnosuke Watanabe

[fs.readfile]: https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
