#!/usr/bin/env node

var package = require('./package.json');

var info = package.name + ' - ' + package.description + '\n' +
    '  version: ' + package.version + '\n' +
    '  author: ' + JSON.stringify(package.author);

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
        default: 10
    })
    .demand(['input'])
    .argv;

var check = require('./lib/check-console');

check({
    url: program.input,
    phantomjs: program.phantomjs,
    verbose: program.verbose,
    timeout: program.timeout
});
