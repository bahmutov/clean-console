var check = require('check-types');

function checkConsole(options) {
    check.verifyObject(options, 'missing options object');
    var url = options.url;
    check.verifyString(url, 'missing url');
    var phantomjs = options.phantomjs || 'phantomjs';
    check.verifyString(phantomjs, 'missing phantomjs path');

    console.log('checking', url);
}

module.exports = checkConsole;