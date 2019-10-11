'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _routers = require('./routers');

var _routers2 = _interopRequireDefault(_routers);

var _middlewares = require('./middlewares');

var _config = require('./config');

var _winston = require('./utils/winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 日志工具

// 保存项目根目录
// 自定义中间件
global.rootPath = __dirname; // 全局配置
// 路由


var app = new _koa2.default();

app
// 错误处理中间件
.use(_middlewares.errorHandle)
// 解析post
.use((0, _koaBodyparser2.default)())
// 静态资源
.use((0, _koaStatic2.default)(_path2.default.join(__dirname)));

// 路由
(0, _routers2.default)(app);

// Start
app.listen(_config.port, function () {
  return _winston2.default.info('\u670D\u52A1\u5DF2\u542F\u52A8 http://localhost:' + _config.port + '/');
});