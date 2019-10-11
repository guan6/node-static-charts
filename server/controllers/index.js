'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _demoCharts = require('./demo/demo.charts.controller');

Object.defineProperty(exports, 'demo', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_demoCharts).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }