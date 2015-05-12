#!/usr/bin/env node

var check = require('./lib/check-console');

if (module.parent) {
    module.exports = check;
} else {
    var package = require('./package.json');
    var info = package.name + ' - ' + package.description + '\n' +
        '  version: ' + package.version + '\n' +
        '  author: ' + JSON.stringify(package.author);

    var updateNotifier = require('update-notifier');
    var notifier = updateNotifier();
    if (notifier.update) {
      notifier.notify();
    }

    var program = require('optimist')
        .usage(info)
        .options('input', {
            alias: 'i',
            string: true,
            description: 'input url',
            default: process.argv[2]
        })
        .options('phantomjs', {
            alias: 'p',
            string: true,
            description: 'phantomjs executable path',
            default: 'phantomjs'
        })
        .options('verbose', {
            alias: 'v',
            boolean: true,
            description: 'let phantomjs be verbose',
            default: false
        })
        .options('timeout', {
            alias: 't',
            description: 'maximum timeout, seconds',
            default: 1
        })
        .demand(['input'])
        .argv;

    check({
        url: program.input,
        phantomjs: program.phantomjs,
        verbose: program.verbose,
        timeout: program.timeout
    })
    .then(function (code) {
        process.exit(code);
    })
    .fail(function (error) {
        console.error(error);
        console.error('is phantomjs "' + phantomjs + '" installed?');
        process.exit(-1);
    })
    .done();
}
