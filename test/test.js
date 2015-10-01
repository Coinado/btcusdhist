'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _blueTape = require('blue-tape');

var _blueTape2 = _interopRequireDefault(_blueTape);

var _indexJs = require('../index.js');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

(0, _blueTape2['default'])('btcPrice', function callee$0$0(t) {
  var dt, price, startOfYear, price2;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        dt = (0, _moment2['default'])('09-14-2014 10:00', 'MM-DD-YYYY HH:mm');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _indexJs.btcToUSD)(dt.toDate()));

      case 3:
        price = context$1$0.sent;

        console.log('Price on ' + dt.format() + ' = ' + price);
        startOfYear = (0, _moment2['default'])().startOf('year');
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _indexJs.btcToUSD)(startOfYear.toDate()));

      case 8:
        price2 = context$1$0.sent;

        console.log('Price on ' + startOfYear.format() + ' = ' + price2);
        (0, _indexJs.done)();
        return context$1$0.abrupt('return', t.equal(1, 1));

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
});