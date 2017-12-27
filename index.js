'use strict';

const {promisify} = require('util');
const {readFile} = require('graceful-fs');

const ARG_ERROR = 'Expected 1 or 2 arguments (<string|Buffer|URL|integer>[, <Object|string>])';
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

	return promisifiedReadFile(...args);
};
