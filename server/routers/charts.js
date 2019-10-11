'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _config = require('../config');

var _bus = require('../controllers/bus');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default({
  prefix: '/' + _config.version
});

// demo

// 所有utils相关控制器中间件
router.get('demo', '/demo', _bus2.default);

// 添加其他图表
// router.get('other', '/other', bus)

exports.default = router;