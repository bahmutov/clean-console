#!/usr/bin/env node

var package = require('./package.json');

var info = package.name + ' - ' + package.description + '\n' +
    '  version: ' + package.version + '\n' +
    '  author: ' + package.author;

var program = require('optimist')
    .usage(info)
    .options('input', {
        alias: 'i',
        string: true,
        description: 'input url'
    })
    .options('phantomjs', {
        alias: 'p',
        string: true,
        description: 'phantomjs executable path',
        default: 'phantomjs'
    })
    .demand(['input'])
    .argv;

var check = require('./lib/check-console');
check({
    url: program.input,
    phantomjs: program.phantomjs
});