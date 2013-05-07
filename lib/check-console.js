var check = require('check-types');
var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');

function checkConsole(options) {
    check.verifyObject(options, 'missing options object');
    var url = options.url;
    check.verifyString(url, 'missing url');
    var phantomjs = options.phantomjs || 'phantomjs';
    check.verifyString(phantomjs, 'missing phantomjs path');

    console.log('checking', url);

    var runner = 'runner.js';
    var phantomRunnerFilename = path.join(path.dirname(module.filename), runner);
    console.assert(fs.existsSync(phantomRunnerFilename), 'could not find phantom runner', phantomRunnerFilename);

    var phantomArguments = [phantomRunnerFilename, url];
    if (options.verbose) {
        phantomArguments.push('--verbose');
    }
    if (options.timeout) {
        console.assert(options.timeout > 0, 'invalid timeout', options.timeout);
        phantomArguments.push('--timeout');
        phantomArguments.push(options.timeout);
    }

    /*
    var phantomjs = spawn(phantomjs, phantomArguments);

    phantomjs.stdout.on('data', function (data) {
        console.log('phantomjs: ' + data);
    });

    phantomjs.stderr.on('data', function (data) {
        console.log('phantomjs error: ' + data);
    });

    phantomjs.on('exit', _.partial(processPhantomJsResults, options));
    */
}

function processPhantomJsResults(options, code) {
    console.log('phantomjs process exited with code ' + code);
    console.assert(fs.existsSync(options.coverageFilename),
        'could not find coverage file', options.coverageFilename);

    console.log('generating detailed HTML coverage pages from', options.coverageFilename);
    var collector = new istanbul.Collector();
    collector.add(JSON.parse(fs.readFileSync(options.coverageFilename, 'utf8')));

    var reportFolder = path.join(process.cwd(), 'cover');
    var report = Report.create('html', {
        dir: reportFolder,
        verbose: false
    });
    report.writeReport(collector, true);
    console.log('wrote html coverage reports to', reportFolder);

    Report.create('text').writeReport(collector);
    Report.create('text-summary').writeReport(collector);

    Report.create('text', {
        file: 'cover.txt'
    }).writeReport(collector);
    console.log('saved coverage text report to', path.join(process.cwd(), 'cover.txt'));

    if (options.untested) {
        var coverageData = collector.getFinalCoverage();
        console.assert(coverageData, 'could not get coverage data');
        updateUntestedDb(coverageData, options);
    }

    process.exit(0);
}

module.exports = checkConsole;