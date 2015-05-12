#!/usr/bin/env node

var check = require('./lib/check-console');
var quote = require('quote');

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
        .options('expect', {
            alias: 'e',
            description: 'number of expeced errors',
            default: 0
        })
        .demand(['input'])
        .argv;

    check({
        url: program.input,
        phantomjs: program.phantomjs,
        verbose: program.verbose,
        timeout: program.timeout,
        expect: program.expect
    })
    .then(function (code) {
        if (program.expect) {
            if (code !== program.expect) {
                console.error('Expected exit code', program.expect, 'got', code);
                process.exit(-1);
            } else {
                process.exit(0);
            }
        } else {
            process.exit(code);
        }
    })
    .catch(function (error) {
        console.error(error);
        console.error('is phantomjs', quote(program.phantomjs), 'installed?');
        process.exit(-1);
    })
    .done();
}
