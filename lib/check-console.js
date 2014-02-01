require('console.json');
var check = require('check-types');
var verify = check.verify;
var spawn = require('child_process').spawn;
var exists = require('fs').existsSync;
var join = require('path').join;
var dirname = require('path').dirname;

function checkConsole(options) {
    verify.object(options, 'missing options object');

    var url = options.url;
    verify.string(url, 'missing url');
    var phantomjs = options.phantomjs || 'phantomjs';
    verify.unemptyString(phantomjs, 'missing phantomjs path');

    if (!check.webUrl(url)) {
        if (!exists(url)) {
            console.log('assuming http:// for', url);
            url = 'http://' + url;
        }
    }

    console.log('checking', url);

    var runner = 'runner.js';
    var phantomRunnerFilename = join(dirname(module.filename), runner);
    console.assert(exists(phantomRunnerFilename),
        'could not find phantom runner ' + phantomRunnerFilename);

    var phantomArguments = [phantomRunnerFilename, url];
    if (options.verbose) {
        console.log('running phantomjs in verbose mode');
        phantomArguments.push('--verbose');
    }
    if (check.number(options.timeout)) {
        verify.positiveNumber(options.timeout, 'invalid timeout ' + options.timeout);
        phantomArguments.push('--timeout');
        phantomArguments.push(options.timeout);
    }

    try {
        var phantomProc = spawn(phantomjs, phantomArguments);
    } catch (err) {
        onPhantomError(err);
    }
    phantomProc.stdout.on('data', function (data) {
        console.log('phantomjs: ' + data);
    });

    phantomProc.stderr.on('data', function (data) {
        console.log('phantomjs error: ' + data);
    });

    phantomProc.on('exit', processPhantomJsResults);
    phantomProc.on('error', onPhantomError);

    function onPhantomError(error) {
        console.error(error);
        console.error('is phantomjs "' + phantomjs + '" installed?');
        process.exit(-1);
    }
}

function processPhantomJsResults(code) {
    console.log('phantomjs process exited with code ' + code);
    process.exit(code);
}

module.exports = checkConsole;
