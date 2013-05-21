gt.module('End 2 end tests');

var path = require('path');
var cc = path.join(__dirname, '../index.js');
var examples = path.join(__dirname, '../examples');

gt.async('basic', 1, function () {
    var url = path.join(examples, 'basic/index.html');
    gt.exec('node', [cc, '--input', url], 2, 'basic page with 2 errors');
}, 4000);

