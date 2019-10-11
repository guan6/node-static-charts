'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('home', '/', function (ctx, next) {
  ctx.body = '\n    <h3>\u6D4B\u8BD5</h3>\n    <ul>\n      <li>\n        <a href="' + _config.version + '/demo?c=demo">\u67E5\u770B\u6F14\u793A</a>\n      </li>\n    </ul>\n  ';
});

exports.default = router;