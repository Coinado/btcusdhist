'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.btcToUSD = btcToUSD;
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

var _fishing = require('fishing');

var _gunzipMaybe = require('gunzip-maybe');

var _gunzipMaybe2 = _interopRequireDefault(_gunzipMaybe);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var ticks = [];
var index = null;

_load().then(function () {});
var reload = setInterval(function () {
  _load();
}, 16 * 1000 * 60 * 60);

function _load() {
  var url, unzip, csv, buffer, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tick;

  return _regeneratorRuntime.async(function _load$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        url = 'http://api.bitcoincharts.com/v1/csv/krakenUSD.csv.gz';
        unzip = (0, _gunzipMaybe2['default'])();

        (0, _request2['default'])(url).pipe(unzip);
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _fishing.toPromise)(unzip));

      case 5:
        csv = context$1$0.sent.toString();
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _es6Promisify2['default'])(_csvParse2['default'])(csv, {}));

      case 8:
        ticks = context$1$0.sent;
        buffer = new ArrayBuffer(ticks.length * 4);

        index = new Int32Array(buffer);
        i = 0;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 15;

        for (_iterator = _getIterator(ticks); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          tick = _step.value;

          tick[0] = tick[0] * 1;
          index[i++] = tick[0];
        }
        context$1$0.next = 23;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t0 = context$1$0['catch'](15);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 23:
        context$1$0.prev = 23;
        context$1$0.prev = 24;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 26:
        context$1$0.prev = 26;

        if (!_didIteratorError) {
          context$1$0.next = 29;
          break;
        }

        throw _iteratorError;

      case 29:
        return context$1$0.finish(26);

      case 30:
        return context$1$0.finish(23);

      case 31:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[15, 19, 23, 31], [24,, 26, 30]]);
}

function load() {
  return _regeneratorRuntime.async(function load$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(ticks.length > 0)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return');

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_load());

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function lastPrice() {
  var prices, url;
  return _regeneratorRuntime.async(function lastPrice$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        prices = null;

        prices = _memoryCache2['default'].get('prices');

        if (prices) {
          context$1$0.next = 8;
          break;
        }

        url = 'https://api.bitcoinaverage.com/ticker/global/USD/';
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_requestPromiseJson2['default'].get(url));

      case 6:
        prices = context$1$0.sent;

        _memoryCache2['default'].put('prices', prices, 30 * 1000);

      case 8:
        return context$1$0.abrupt('return', prices.last);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function btcToUSD(btc, dateTime) {
  var price, unixTime, closest;
  return _regeneratorRuntime.async(function btcToUSD$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(Date.now() - dateTime.getTime() < 1000 * 60 * 60 * 24)) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(lastPrice());

      case 3:
        price = context$1$0.sent;
        return context$1$0.abrupt('return', price * btc);

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(load());

      case 7:
        unixTime = dateTime / 1000;
        closest = _binarysearch2['default'].closest(index, unixTime);
        return context$1$0.abrupt('return', ticks[closest][1] * btc);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function done() {
  clearInterval(reload);
}