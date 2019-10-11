'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * api 处理基础类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * promisify: callback to promise (node >= 8)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * request: nodejs http
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


require('babel-polyfill');

var _util = require('util');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _winston = require('../utils/winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * promise 封装 request
 * request.defaults: request 全局默认配置
 */
var requestPromise = (0, _util.promisify)(_request2.default.defaults({
  json: true,
  baseUrl: process.env.BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}));

var Base = function () {
  function Base() {
    _classCallCheck(this, Base);
  }

  _createClass(Base, [{
    key: 'http',

    /**
     * http请求方法
     * https://github.com/request/request#requestoptions-callback
     * 
     * 
     * @param {Object} option - request配置
     * @param {Object} option.ctx - koa context
     * @param {Object} option.options - request模块配置
     * @param {String} [option.data] - 请求参数数据
     * @param {String} [option.needAuth] - 源接口是否需要认证？
     * 
     */
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var ctx = _ref.ctx,
            options = _ref.options,
            data = _ref.data,
            _ref$needAuth = _ref.needAuth,
            needAuth = _ref$needAuth === undefined ? false : _ref$needAuth;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                /**
                 * headers
                 */
                options.headers = options.headers || {};
                options.headers['Content-Type'] = options.headers['Content-Type'] || ctx.request.type;

                /**
                 * request method
                 */
                options.method = options.method ? options.method : ctx.method;

                /**
                 * 如果接口需要认证，添加auth配置，认证方式bearer Token
                 */

                if (needAuth) {
                  options.auth = {
                    bearer: ctx.request.headers.authorization
                  };
                }

                /**
                 * request 参数适配
                 */

                if (!(options.method === 'POST')) {
                  _context.next = 15;
                  break;
                }

                _context.t0 = ctx.request.type;
                _context.next = _context.t0 === 'application/x-www-form-urlencoded' ? 8 : _context.t0 === 'application/json' ? 10 : _context.t0 === 'multipart/form-data' ? 12 : 14;
                break;

              case 8:
                options.form = data;
                return _context.abrupt('break', 15);

              case 10:
                options.body = data;
                return _context.abrupt('break', 15);

              case 12:
                options.formData = data;
                return _context.abrupt('break', 15);

              case 14:
                return _context.abrupt('break', 15);

              case 15:

                if (options.method === 'GET') {
                  options.qs = data;
                }

                /**
                 * 输出debug日志
                 */
                _winston2.default.debug(JSON.stringify(options));

                /**
                 * return request promise
                 */
                return _context.abrupt('return', requestPromise(options));

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function http(_x) {
        return _ref2.apply(this, arguments);
      }

      return http;
    }()
  }]);

  return Base;
}();

exports.default = Base;