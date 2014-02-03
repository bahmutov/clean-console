var page = require('webpage').create();
var system = require('system');

if (system.args.length === 1) {
    console.log('Usage: phantomjs runner.js <some URL> --timeout <ms>');
    console.log(' --timeout is optional');
    phantom.exit();
}
var url = system.args[1];

var timeout = (function findTimeoutArgument(args) {
    var t = 0;
    args.forEach(function (arg, k) {
        if (arg === '--timeout') {
            t = args[k + 1];
        }
    });
    return t;
}(system.args)) || 1000;

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

var errorCounter = 0;

page.onResourceError = function(resourceError) {
    errorCounter += 1;

    console.error('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
    console.error('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};

page.onError = function(msg, trace) {
    errorCounter += 1;
    var msgStack = ['ERROR: ' + msg];
    if (trace) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line +
                (t.function ? ' (in function "' + t.function + '")' : ''));
        });
    }
    console.error(msgStack.join('\n'));
};

console.log('opening page', url);
page.open(url, function(status) {
    if ( status !== "success" ) {
        console.error('loading page', url, 'status', status);
        phantom.exit(1);
    }

    setTimeout(function letPageRun() {
        console.log('Checking errors after sleeping for', timeout + 'ms');
        if (!errorCounter) {
            console.log('ok', url);
            phantom.exit();
        } else {
            console.log('' + errorCounter, 'error(s) on', url);
            phantom.exit(errorCounter);
        }
    }, timeout);
});
