gt.module('using clean-console');

var join = require('path').join;
var examples = join(__dirname, '../examples');

var check = require('..');

gt.async('basic', function () {
  gt.func(check, 'check is a function');
  var url = join(examples, 'basic/index.html');
  check({
    url: url
  }).then(function (code) {
    gt.equal(code, 2, 'there should be two errors');
  }).finally(function () {
    gt.start();
  });
}, 5000);

gt.async('async_error', function () {
  var url = join(examples, 'timeout/index.html');
  check({
    url: url,
    timeout: 10
  }).then(function (code) {
    gt.equal(code, 1, 'there should be an error after timeout');
  }).finally(function () {
    gt.start();
  });
}, 15000);
