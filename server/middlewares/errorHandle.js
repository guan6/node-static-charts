'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('../utils/winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 错误处理
 */
exports.default = function (ctx, next) {
  // 客户端IP
  var ip = ctx.request.headers['x-real-ip'] || ctx.request.headers['x-forwarded-for'] || ctx.ip;

  return next().then(function () {
    // 记录访问日志
    _winston2.default.info(ctx.status + ' - ' + ctx.method + ' - ' + ctx.originalUrl + ' - ' + ctx.request.headers['user-agent'] + ' - ' + ip);
  }).catch(function (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    // 记录错误日志
    _winston2.default.error(ctx.response.status + ' - ' + ctx.method + ' - ' + ctx.originalUrl + ' - ' + err.message + ' - ' + ip);

    console.log(err);

    ctx.response.body = 'message: ' + err.message;
  });
};