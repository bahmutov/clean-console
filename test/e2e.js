gt.module('End 2 end tests');

var path = require('path');
var cc = path.join(__dirname, '../index.js');
var examples = path.join(__dirname, '../examples');

gt.async('local file', 1, function () {
    var url = path.join(examples, 'basic/index.html');
    gt.exec('node', [cc, '--input', url], 2, 'basic page with 2 errors');
}, 4000);

gt.async('local file with expected number of errors', 1, function () {
    var url = path.join(examples, 'basic/index.html');
    gt.exec('node', [cc, '--input', url, '--expect', 2], 0,
      'basic page with 2 expected errors');
}, 4000);

gt.async('local file as default argument', 1, function () {
    var url = path.join(examples, 'basic/index.html');
    gt.exec('node', [cc, url], 2, 'basic page with 2 errors');
}, 4000);

gt.async('google', 1, function () {
    var url = 'http://google.com';
    gt.exec('node', [cc, url], 0, 'google is fine');
}, 15000);

gt.async('with timeout', 1, function () {
    var url = path.join(examples, 'timeout/index.html');
    gt.exec('node', [cc, url, '--timeout', '10'], 1,
      'page has error after a few seconds');
}, 15000);

gt.async('failed to load CSS', 1, function () {
    var url = path.join(examples, '404/index.html');
    gt.exec('node', [cc, url, '--timeout', '10'], 1,
      'page has error if something could not be loaded');
}, 15000);

gt.async('failed to load CSS dynamically', 1, function () {
    var url = path.join(examples, 'loadNonExistingCss/index.html');
    gt.exec('node', [cc, url, '--timeout', '10'], 1,
      'page has error if something could not be loaded');
}, 15000);

gt.async('loading js using requirejs', 1, function () {
    var url = path.join(examples, 'requirejs/index.html');
    gt.exec('node', [cc, url, '--timeout', '5'], 1,
      'page has error if something could not be loaded');
}, 15000);

gt.async('requirejs text plugin', 1, function () {
    var url = path.join(examples, 'requirejs-text/index.html');
    gt.exec('node', [cc, url, '--timeout', '3'], 0,
      'text file loaded');
}, 5000);

gt.async('requirejs css plugin', 1, function () {
    var url = path.join(examples, 'requirejs-css/index.html');
    gt.exec('node', [cc, url, '--timeout', '3'], 0,
      'CSS file loaded');
}, 5000);
