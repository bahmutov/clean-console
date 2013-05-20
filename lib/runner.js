var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

var errorCounter = 0;
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

// var url = 'http://www.salon.com/';
var url = 'http://localhost/git/clean-console/examples/basic/';

console.log('opening page', url);
page.open(url, function(status) {
    if ( status !== "success" ) {
        console.error('loading page', url, 'status', status);
        phantom.exit(1);
    } else {
        if (!errorCounter) {
            console.log('ok', url);
            phantom.exit();
        } else {
            console.log('' + errorCounter, 'error(s) on', url);
            phantom.exit(errorCounter);
        }
    }
});