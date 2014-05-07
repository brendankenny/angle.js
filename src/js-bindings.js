/**
 * Copyright 2014 Google Inc. All rights reserved.
 * 
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/* global Module */

/**
 * Regex for parsing lines of the error log returned by the angular validator.
 * @private {!RegExp}
 * @const
 */
Module.ERROR_LOG_SPLIT_ = /ERROR: 0:(\d+): '([^\']*)' : (.*)/;

/**
 * Status codes for translation attempt.
 * @enum {number}
 * @const
 * @private
 */
Module.TRANSLATE_STATUS_ = {
    SUCCESS: 0,
    FAIL_USAGE: 1,
    FAIL_COMPILE: 2,
    FAIL_COMPILER_CREATE: 3
};

/**
 * Attempts to compile the fragment shader, returning a log of any errors.
 * @param {string} shaderSrc
 */
Module.translateShader = function(shaderSrc) {
	var start = window.performance.now();

	// have to allocate a slot for the resulting pointer ourselves
	var errorLoc = Module['_malloc'](4);
	Module['setValue'](errorLoc, 0, '*');
	var codeLoc = Module['_malloc'](4);
	Module['setValue'](codeLoc, 0, '*');

	var result = Module['ccall']('TranslateShader', 'number', ['string', 'number', 'number'], [shaderSrc, errorLoc, codeLoc]);

	var end = window.performance.now();
	console.log('compile time: ' + (end - start).toFixed(3) + 'ms');

	var translatedCode = Module['getValue'](codeLoc, '*');
	var errorLog = Module['getValue'](errorLoc, '*');
	var errors = [];

	if (result === Module.TRANSLATE_STATUS_.SUCCESS) {
		console.log('success!');
		var translatedString = Module['Pointer_stringify'](translatedCode);
		console.log(translatedString);

	} else {
		console.log('error');
		// TODO(bckenny): other errors

		// TODO(bckenny): since Pointer_stringify is assembling string character by
		// character anyways, might as well have it split by line at the same time
		var logString = Module['Pointer_stringify'](errorLog);
		var logLines = logString.split('\n');
		logLines.forEach(function(line) {
			var error = Module.ERROR_LOG_SPLIT_.exec(line);
			if (error) {
				errors.push({
					'line': parseInt(error[1], 10) - 1,
					'token': error[2],
					'description': error[3].trim()
				});
			}
		});

		console.log(errors);
	}

	// responsible for freeing log and translated code, if generated
	if (translatedCode) {
		Module['_free'](translatedCode);
	}
	if (errorLog) {
		Module['_free'](errorLog);
	}
	Module['_free'](errorLoc);
	Module['_free'](codeLoc);
};

// export for Closure
Module['translateShader'] = Module.translateShader;
