(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TextToLinks"] = factory();
	else
		root["TextToLinks"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isWhitespace = __webpack_require__(1);

var _isWhitespace2 = _interopRequireDefault(_isWhitespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextToLinks = function TextToLinks(quill, options) {
  var _this = this;

  _classCallCheck(this, TextToLinks);

  this.quill = quill;
  this.options = options;

  this.matches = [{
    name: 'link',
    pattern: /https?:\/\/[^\s]+$/g,
    action: function action(text, pattern, endRetain) {
      var url = text.match(pattern)[0];
      var ops = [];

      if (endRetain > url.length) {
        ops.push({ retain: endRetain - url.length });
      }

      ops = ops.concat([{ delete: url.length }, { insert: url, attributes: { link: url } }]);

      _this.quill.updateContents({
        ops: ops
      });
    }
  }, {
    name: 'mailto',
    pattern: /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
    action: function action(text, pattern, endRetain) {
      var url = text.match(pattern)[0];
      var ops = [];

      if (endRetain > url.length) {
        ops.push({ retain: endRetain - url.length });
      }

      ops = ops.concat([{ delete: url.length }, { insert: url, attributes: { link: 'mailto:' + url } }]);

      _this.quill.updateContents({
        ops: ops
      });
    }
  }];

  this.quill.on('text-change', function (delta, oldContents, source) {
    if (delta.ops.length === 2 && delta.ops[0].retain && (0, _isWhitespace2.default)(delta.ops[1].insert)) {
      var endRetain = delta.ops[0].retain;
      var text = quill.getText().substr(0, endRetain);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var match = _step.value;

          var matchedText = text.match(match.pattern);
          if (matchedText) {
            match.action(text, match.pattern, endRetain);
            return;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  });
};

exports.default = TextToLinks;


module.exports = TextToLinks;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-whitespace <https://github.com/jonschlinkert/is-whitespace>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var cache;

module.exports = function isWhitespace(str) {
  return (typeof str === 'string') && regex().test(str);
};

function regex() {
  // ensure that runtime compilation only happens once
  return cache || (cache = new RegExp('^[\\s\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF"]+$'));
}


/***/ })
/******/ ]);
});