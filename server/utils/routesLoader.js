'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (dirname) {
  return new Promise(function (resolve, reject) {
    var routes = [];
    (0, _glob2.default)(dirname + '/*.js', {
      ignore: '**/index.js'
    }, function (err, files) {
      if (err) {
        return reject(err);
      }
      files.forEach(function (file) {
        var route = require(file);
        // require 导入 使用exprot default的模块
        routes.push(route.default);
      });
      return resolve(routes);
    });
  });
};

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }