'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('canvas');

var _echarts = require('echarts');

var _echarts2 = _interopRequireDefault(_echarts);

var _utils = require('../utils/utils');

var _index = require('./index');

var controllers = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import fs from 'fs'


//  注册字体
(0, _canvas.registerFont)(global.rootPath + '/static/pingfang-sc.ttf', { family: 'pingfang' });

/**
 * 路由入口控制器，负责根据不同的控制器名称，调用对应的控制器处理数据。
 * @param {*} ctx 
 * @param {*} next 
 */
var bus = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    var _ref2, requestData, _requestData$c, c, _requestData$w, w, _requestData$h, h, _requestData$bg, bg, _requestData$imgType, imgType, pr, _ref3, chartOption, canvas, myChart, base64String, base64Image, imgBuffer;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _utils.getRequestData)(ctx);

          case 2:
            _ref2 = _context.sent;
            requestData = _ref2.requestData;
            _requestData$c = requestData.c, c = _requestData$c === undefined ? '' : _requestData$c, _requestData$w = requestData.w, w = _requestData$w === undefined ? 200 : _requestData$w, _requestData$h = requestData.h, h = _requestData$h === undefined ? 200 : _requestData$h, _requestData$bg = requestData.bg, bg = _requestData$bg === undefined ? '' : _requestData$bg, _requestData$imgType = requestData.imgType, imgType = _requestData$imgType === undefined ? 'png' : _requestData$imgType;

            //像素比(如像素比为2，则返回图片大小为传入宽高的2倍, 为1时不成生产图表，原因不详)

            pr = 2;

            // 根据名称调用指定控制器，获取完整图表配置

            _context.next = 8;
            return controllers[c]({
              ctx: ctx,
              requestData: requestData
            });

          case 8:
            _ref3 = _context.sent;
            chartOption = _ref3.chartOption;


            // 创建canva
            canvas = (0, _canvas.createCanvas)(32, 32);

            /**
             * 这是一个非公开api，大概功能应该是使用自定义的canvas对象，而不使用echart默认创建的。
             * 会失去一些特性，比如宽高自适应，需要处理好数据量和画布空间之间的关系。
             */

            _echarts2.default.setCanvasCreator(function () {
              return canvas;
            });

            // echart实例
            myChart = _echarts2.default.init(canvas);

            // 调整canvas尺寸

            myChart.resize({
              width: w,
              height: h
            });

            // 配置echart
            myChart.setOption(chartOption);

            // to base64
            base64String = myChart.getDataURL({
              type: imgType,
              pixelRatio: pr,
              backgroundColor: bg ? '#' + bg : ''
            });

            // 手动销毁实例，防止内存泄漏

            myChart.clear();
            myChart.dispose();
            canvas = null;

            base64Image = base64String.split(';base64,').pop(), imgBuffer = new Buffer(base64Image, 'base64');

            // content-type

            ctx.type = imgType;

            // response
            ctx.body = imgBuffer;

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function bus(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = bus;