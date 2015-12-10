'use strict';

var _blueTape = require('blue-tape');

var _blueTape2 = _interopRequireDefault(_blueTape);

var _index = require('../index.js');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

(0, _blueTape2.default)('btcPrice', (function () {
  var _this = this;

  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(t) {
    var dt, price, startOfYear, price2, nowPrice;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dt = (0, _moment2.default)('09-14-2014 10:00', 'MM-DD-YYYY HH:mm');
            _context.next = 3;
            return (0, _index.btcToUSD)(1, dt.toDate());

          case 3:
            price = _context.sent;

            console.log('Price on ' + dt.format() + ' = ' + price);
            startOfYear = (0, _moment2.default)().startOf('year');
            _context.next = 8;
            return (0, _index.btcToUSD)(1, startOfYear.toDate());

          case 8:
            price2 = _context.sent;

            console.log('Price on ' + startOfYear.format() + ' = ' + price2);

            _context.next = 12;
            return (0, _index.btcToUSD)(1, new Date());

          case 12:
            nowPrice = _context.sent;

            console.log('Current price is ' + nowPrice);
            (0, _index.done)();
            return _context.abrupt('return', t.equal(1, 1));

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x) {
    return ref.apply(this, arguments);
  };
})());