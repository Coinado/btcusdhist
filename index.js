'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.btcToUSD = btcToUSD;

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

var _es6Promisify = require('es6-promisify');

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

var _binarysearch = require('binarysearch');

var _binarysearch2 = _interopRequireDefault(_binarysearch);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _promiseStream = require('promise-stream');

var _promiseStream2 = _interopRequireDefault(_promiseStream);

var _fishing = require('fishing');

var _gunzipMaybe = require('gunzip-maybe');

var _gunzipMaybe2 = _interopRequireDefault(_gunzipMaybe);

var ticks = [];
var index = null;

load().then(function () {});

function load(reload) {
  var url, unzip, csv, buffer, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tick;

  return _regeneratorRuntime.async(function load$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(!reload && ticks.length > 0)) {
          context$1$0.next = 2;
          break;
        }

        return context$1$0.abrupt('return');

      case 2:
        url = 'http://api.bitcoincharts.com/v1/csv/krakenUSD.csv.gz';
        unzip = (0, _gunzipMaybe2['default'])();

        (0, _request2['default'])(url).pipe(unzip);
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _fishing.toPromise)(unzip));

      case 7:
        csv = context$1$0.sent.toString();

        console.log(csv);
        console.log(csv.length);
        process.exit();
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap((0, _es6Promisify2['default'])(_csvParse2['default'])(csv, {}));

      case 13:
        ticks = context$1$0.sent;
        buffer = new ArrayBuffer(ticks.length * 4);

        index = new Int32Array(buffer);
        i = 0;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 20;

        for (_iterator = _getIterator(ticks); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          tick = _step.value;

          tick[0] = tick[0] * 1;
          index[i++] = tick[0];
        }
        context$1$0.next = 28;
        break;

      case 24:
        context$1$0.prev = 24;
        context$1$0.t0 = context$1$0['catch'](20);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 28:
        context$1$0.prev = 28;
        context$1$0.prev = 29;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 31:
        context$1$0.prev = 31;

        if (!_didIteratorError) {
          context$1$0.next = 34;
          break;
        }

        throw _iteratorError;

      case 34:
        return context$1$0.finish(31);

      case 35:
        return context$1$0.finish(28);

      case 36:
        setInterval(function () {
          load(true);
        }, 16 * 1000 * 60 * 60);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[20, 24, 28, 36], [29,, 31, 35]]);
}

function lastPrice() {
  return _regeneratorRuntime.async(function lastPrice$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function btcToUSD(dateTime) {
  var unixTime, closest;
  return _regeneratorRuntime.async(function btcToUSD$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(Date.now() - dateTime.getTime() < 1000 * 60 * 60 * 24)) {
          context$1$0.next = 4;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(lastPrice());

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(load());

      case 6:
        unixTime = dateTime / 1000;
        closest = _binarysearch2['default'].closest(index, unixTime);
        return context$1$0.abrupt('return', ticks[closest][1]);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}