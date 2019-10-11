'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _demo = require('../../api/demo/demo.charts');

var _demo2 = _interopRequireDefault(_demo);

var _echartTpl = require('../../config/echartTpl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var ctx = _ref.ctx,
        requestData = _ref.requestData;

    var _ref3, body, chartOption;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _demo2.default.getChartData({
              ctx: ctx,
              data: requestData
            });

          case 2:
            _ref3 = _context.sent;
            body = _ref3.body;
            chartOption = JSON.parse(JSON.stringify(_echartTpl.tpl01));

            // 在模板中设置数据

            chartOption.xAxis.data = body.data.xAxisData;
            chartOption.series[0].data = body.data.seriesData;

            // 返回图表配置项
            return _context.abrupt('return', {
              chartOption: chartOption
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();