'use strict';

const test = require('tape');
const readFile = require('.');

test('fsReadFilePromise()', async t => {
	t.ok(
		(await readFile('.gitattributes')).equals(Buffer.from('* text=auto\n')),
		'should read a file.'
	);

	t.equal(
		await readFile('.gitattributes', 'utf8'),
		'* text=auto\n', 'should reflect encoding to the result.'
	);

	try {
		await readFile('__this_file_does_not_exist__', null);
	} catch ({code}) {
		t.equal(code, 'ENOENT', 'should be rejected when the file doesn\'t exist.');
	}

	try {
		await readFile(__dirname, undefined);
	} catch ({code}) {
		t.equal(code, 'EISDIR', 'should be rejected when it tries to read a directory.');
	}

	try {
		await readFile(true);
	} catch ({name}) {
		t.equal(name, 'TypeError', 'should throw a type error when the path isn\'t a string.');
	}

	try {
		await readFile('.gitattributes', {encoding: 'foo'});
	} catch ({code}) {
		t.equal(
			code,
			'ERR_INVALID_OPT_VALUE_ENCODING',
			'should throw an error when the encoding is not supported.'
		);
	}

	try {
		await readFile('.gitattributes', true);
	} catch ({code}) {
		t.equal(
			code,
			'ERR_INVALID_ARG_TYPE',
			'should throw a type error when the second argument is not a string or an object.'
		);
	}

	try {
		await readFile();
	} catch ({name}) {
		t.equal(name, 'TypeError', 'should throw a type error when it takes no arguments.');
	}

	t.end();
});
