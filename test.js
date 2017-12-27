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
		t.equal(code, 'ENOENT', 'should fail when the file doesn\'t exist.');
	}

	try {
		await readFile(__dirname, undefined);
	} catch ({code}) {
		t.equal(code, 'EISDIR', 'should fail when it tries to read a directory.');
	}

	try {
		await readFile(true);
	} catch ({name}) {
		t.equal(name, 'TypeError', 'should fail when the path isn\'t a string.');
	}

	try {
		await readFile('.gitattributes', {encoding: 'foo'});
	} catch ({code}) {
		t.equal(
			code,
			'ERR_INVALID_OPT_VALUE_ENCODING',
			'should fail when the encoding is not supported.'
		);
	}

	try {
		await readFile('.gitattributes', true);
	} catch ({code}) {
		t.equal(
			code,
			'ERR_INVALID_ARG_TYPE',
			'should fail when the second argument is not a string or an object.'
		);
	}

	try {
		await readFile('');
	} catch ({message}) {
		t.equal(
			message,
			'Expected a valid file path or a file descripter to read, but got \'\' (empty string).',
			'should fail when the path is an empty string.'
		);
	}

	try {
		await readFile(Buffer.alloc(0));
	} catch ({message}) {
		t.equal(
			message,
			'Expected a valid file path or a file descripter to read, but got a zero-length Buffer.',
			'should fail when the path is an empty Buffer.'
		);
	}

	try {
		await readFile();
	} catch ({message}) {
		t.equal(
			message,
			'Expected 1 or 2 arguments (<string|Buffer|URL|integer>[, <Object|string>]), but got no arguments.',
			'should fail when it takes no arguments.'
		);
	}

	try {
		await readFile('1', '2', '3');
	} catch ({message}) {
		t.equal(
			message,
			'Expected 1 or 2 arguments (<string|Buffer|URL|integer>[, <Object|string>]), but got 3 arguments.',
			'should fail when it takes too many arguments.'
		);
	}

	t.end();
});
