'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

require('winston-daily-rotate-file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var combine = _winston.format.combine,
    colorize = _winston.format.colorize,
    timestamp = _winston.format.timestamp,
    printf = _winston.format.printf;

/**
 * 日志目录
 */

var logDir = _path2.default.resolve('./') + '/logs';

/**
 * 是否需要创建日志目录
 */
if (!_fs2.default.existsSync(logDir)) {
  _fs2.default.mkdirSync(logDir);
}

/**
 * winston 实例
 */
var logger = (0, _winston.createLogger)({
  format: combine(timestamp({
    format: 'YYYY-MM-DD HH:mm:ss' // 时间格式
  })),
  /**
   * 定义输出
   */
  transports: [
  // console 输出
  new _winston.transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(colorize(), // 有色输出
    printf(function (info) {
      return info.timestamp + ' ' + info.level + ': ' + info.message;
    }))
  }),
  // 按天输出到文件
  new _winston.transports.DailyRotateFile({
    level: 'info',
    format: combine(printf(function (info) {
      return info.timestamp + ' ' + info.level + ': ' + info.message;
    })),
    filename: logDir + '/%DATE%-results.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '7d' //最多保留天的日志
  })]
});

exports.default = logger;