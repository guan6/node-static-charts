'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  (0, _routesLoader2.default)('' + __dirname).then(function (files) {
    files.forEach(function (route) {
      app.use(route.routes()).use(route.allowedMethods({
        throw: true
      }));
    });
  });
};

var _routesLoader = require('../utils/routesLoader');

var _routesLoader2 = _interopRequireDefault(_routesLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }