'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.btcToUSD = undefined;
exports.done = done;

var _requestPromiseJson = require('request-promise-json');

var _requestPromiseJson2 = _interopRequireDefault(_requestPromiseJson);

var _util = require('util');

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

var _es6Promisify = require('es6-promisify');

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _binarysearch = require('binarysearch');

var _binarysearch2 = _interopRequireDefault(_binarysearch);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _sprom = require('sprom');

var _sprom2 = _interopRequireDefault(_sprom);

var _gunzipMaybe = require('gunzip-maybe');

var _gunzipMaybe2 = _interopRequireDefault(_gunzipMaybe);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

var ticks = [];
var index = null;

var reload = setInterval(function () {
  _load();
}, 16 * 1000 * 60 * 60);

var _load = (function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var url, unzip, csv, buffer, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tick;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = 'http://api.bitcoincharts.com/v1/csv/krakenUSD.csv.gz';
            unzip = (0, _gunzipMaybe2.default)();

            (0, _request2.default)(url).pipe(unzip);
            _context.next = 5;
            return (0, _sprom2.default)(unzip);

          case 5:
            csv = _context.sent.toString();
            _context.next = 8;
            return (0, _es6Promisify2.default)(_csvParse2.default)(csv, {});

          case 8:
            ticks = _context.sent;
            buffer = new ArrayBuffer(ticks.length * 4);

            index = new Int32Array(buffer);
            i = 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 15;

            for (_iterator = ticks[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              tick = _step.value;

              tick[0] = tick[0] * 1;
              index[i++] = tick[0];
            }
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](15);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 23:
            _context.prev = 23;
            _context.prev = 24;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 26:
            _context.prev = 26;

            if (!_didIteratorError) {
              _context.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context.finish(26);

          case 30:
            return _context.finish(23);

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[15, 19, 23, 31], [24,, 26, 30]]);
  }));

  return function _load() {
    return ref.apply(this, arguments);
  };
})();

_load().then(function () {});

var load = (function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(ticks.length > 0)) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt('return');

          case 4:
            _context2.next = 6;
            return _load();

          case 6:
            return _context2.abrupt('return', _context2.sent);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function load() {
    return ref.apply(this, arguments);
  };
})();

var lastPrice = (function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var prices, url;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            prices = null;

            prices = _memoryCache2.default.get('prices');

            if (prices) {
              _context3.next = 8;
              break;
            }

            url = 'https://api.bitcoinaverage.com/ticker/global/USD/';
            _context3.next = 6;
            return _requestPromiseJson2.default.get(url);

          case 6:
            prices = _context3.sent;

            _memoryCache2.default.put('prices', prices, 30 * 1000);

          case 8:
            return _context3.abrupt('return', prices.last);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function lastPrice() {
    return ref.apply(this, arguments);
  };
})();

var btcToUSD = exports.btcToUSD = (function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(btc, dateTime) {
    var price, unixTime, closest;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(Date.now() - dateTime.getTime() < 1000 * 60 * 60 * 24)) {
              _context4.next = 5;
              break;
            }

            _context4.next = 3;
            return lastPrice();

          case 3:
            price = _context4.sent;
            return _context4.abrupt('return', price * btc);

          case 5:
            _context4.next = 7;
            return load();

          case 7:
            dateTime = dateTime.getTime();
            unixTime = Math.round(dateTime / 1000);
            closest = _binarysearch2.default.closest(index, unixTime);
            return _context4.abrupt('return', ticks[closest][1] * btc);

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function btcToUSD(_x, _x2) {
    return ref.apply(this, arguments);
  };
})();

function done() {
  clearInterval(reload);
}