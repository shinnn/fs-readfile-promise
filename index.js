'use strict';

const {promisify} = require('util');
const {readFile} = require('fs');

const ARG_ERROR = 'Expected 1 or 2 arguments (<string|Buffer|URL|integer>[, <Object|string>])';
const PATH_ERROR = 'Expected a valid file path or a file descripter to read';
const promisifiedReadFile = promisify(readFile);

module.exports = async function fsReadFilePromise(...args) {
	const argLen = args.length;

	if (argLen === 0) {
		const error = new RangeError(`${ARG_ERROR}, but got no arguments.`);
		error.code = 'ERR_MISSING_ARGS';

		throw error;
	}

	if (argLen > 2) {
		throw new RangeError(`${ARG_ERROR}, but got ${argLen} arguments.`);
	}

	const [path] = args;

	if (path === '') {
		const error = new Error(`${PATH_ERROR}, but got '' (empty string).`);
		error.code = 'ERR_INVALID_ARG_VALUE';

		throw error;
	}

	if (path.length === 0) {
		const error = new Error(`${PATH_ERROR}, but got a zero-length ${
			Buffer.isBuffer(path) ? 'Buffer' : 'Uint8Array'
		}.`);
		error.code = 'ERR_INVALID_ARG_VALUE';

		throw error;
	}

	return promisifiedReadFile(...args);
};
