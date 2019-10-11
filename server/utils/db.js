'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _config = require('../config');

var _winston = require('./winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 连接数据库
var dbClient = _redis2.default.createClient(_config.redisConf.port, _config.redisConf.host, _config.redisConf.option); // 全局配置


dbClient.on('error', function (err) {
  _winston2.default.debug('db_error: ' + err);
});

exports.default = dbClient;