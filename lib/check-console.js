var check = require('check-types');
var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');

function checkConsole(options) {
    check.verify.object(options, 'missing options object');

    var url = options.url;
    check.verify.string(url, 'missing url');
    var phantomjs = options.phantomjs || 'phantomjs';
    check.verify.string(phantomjs, 'missing phantomjs path');

    if (!check.webUrl(url)) {
        if (!fs.existsSync(url)) {
            console.log('assuming http:// for', url);
            url = 'http://' + url;
        }
    }

    console.log('checking', url);

    var runner = 'runner.js';
    var phantomRunnerFilename = path.join(path.dirname(module.filename), runner);
    console.assert(fs.existsSync(phantomRunnerFilename), 'could not find phantom runner', phantomRunnerFilename);

    var phantomArguments = [phantomRunnerFilename, url];
    if (options.verbose) {
        console.log('running phantomjs in verbose mode');
        phantomArguments.push('--verbose');
    }
    if (options.timeout) {
        console.assert(options.timeout > 0, 'invalid timeout', options.timeout);
        phantomArguments.push('--timeout');
        phantomArguments.push(options.timeout);
    }

    var phantomjs = spawn(phantomjs, phantomArguments);

    phantomjs.stdout.on('data', function (data) {
        console.log('phantomjs: ' + data);
    });

    phantomjs.stderr.on('data', function (data) {
        console.log('phantomjs error: ' + data);
    });

    phantomjs.on('exit', processPhantomJsResults);
}

function processPhantomJsResults(code) {
    console.log('phantomjs process exited with code ' + code);
    process.exit(code);
}

module.exports = checkConsole;
