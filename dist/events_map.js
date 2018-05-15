module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events_map = __webpack_require__(2);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_events_map).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isNode = exports.isNode = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object';
var isBrowser = exports.isBrowser = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object';
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _consts = __webpack_require__(1);

var _polyfills = __webpack_require__(3);

var _utils = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var internals = (0, _polyfills.Symbol)('__events_map__');

var EventsMap = function () {
  function EventsMap() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EventsMap);

    if (!(0, _utils.isObject)(options)) {
      throw TypeError('options must be an object');
    }

    var _context$rootNode$opt = _extends({
      context: _polyfills.global,
      rootNode: _polyfills.document
    }, options),
        context = _context$rootNode$opt.context,
        rootNode = _context$rootNode$opt.rootNode;

    if (!(0, _utils.isObject)(context)) {
      throw TypeError('options.context must be an object');
    }

    if (rootNode != null && !(0, _utils.isEventTarget)(rootNode)) {
      throw TypeError('options.rootNode must be an event target');
    }

    this[internals] = {
      context: context,
      rootNode: rootNode,
      captureHandlers: new Map(),
      bubbleHandlers: new Map()
    };
  }

  _createClass(EventsMap, [{
    key: 'on',
    value: function on(target, name, handler) {
      var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var useCapture = void 0;

      if (!(0, _utils.isEventTarget)(target)) {
        throw TypeError('Argument 1 must be an event target');
      }

      if (!(0, _utils.isString)(name)) {
        throw TypeError('Argument 2 must be a string');
      }

      if (!(0, _utils.isFunction)(handler)) {
        throw TypeError('Argument 3 must be a function');
      }

      if ((0, _utils.isNumber)(priority)) {
        if (priority <= 0) {
          throw TypeError('Priority must be 0 or greater');
        }

        useCapture = false;
      } else if ((0, _utils.isBoolean)(priority)) {
        useCapture = priority;
        priority = null;
      } else {
        throw TypeError('Argument 4 must be a number or a boolean');
      }

      var _internals = this[internals],
          context = _internals.context,
          rootNode = _internals.rootNode;


      var handlers = useCapture ? this[internals].captureHandlers : this[internals].bubbleHandlers;

      var handlersMap = handlers.get(target);

      if (!handlersMap) {
        handlersMap = new Map();
        handlers.set(target, handlersMap);
      }

      var boundHandlers = handlersMap.get(name);

      if (!boundHandlers) {
        boundHandlers = new Map();
        handlersMap.set(name, boundHandlers);
      }

      var boundHandler = function boundHandler(e) {
        if (!rootNode || !(0, _utils.isNumber)(priority)) {
          return handler.call(context, e);
        }

        var handlingQueues = void 0;

        if (rootNode[internals]) {
          handlingQueues = rootNode[internals].handlingQueues;
        } else {
          handlingQueues = {};
          rootNode[internals] = { handlingQueues: handlingQueues };

          var executor = function executor() {
            Object.keys(handlingQueues).sort().forEach(function (queueIndex) {
              var handlingQueue = handlingQueues[queueIndex];

              handlingQueue.forEach(function (handler) {
                handler.call(context, e);
              });
            });
          };

          rootNode[internals].executor = executor;

          (0, _polyfills.setImmediate)(function () {
            delete rootNode[internals];

            rootNode.removeEventListener(e.type, executor);
          });

          rootNode.addEventListener(e.type, executor);
        }

        var handlingQueue = handlingQueues[priority];

        if (!handlingQueue) {
          handlingQueue = [];
          handlingQueues[priority] = handlingQueue;
        }

        handlingQueue.push(handler);
      };

      boundHandlers.set(handler, boundHandler);

      var on = target.addEventListener || target.on;

      on.call(target, name, boundHandler, useCapture);

      // Push the executor to the top of the execution queue
      if (target === rootNode && rootNode[internals]) {
        rootNode.removeEventListener(name, rootNode[internals].executor);
        rootNode.addEventListener(name, rootNode[internals].executor);
      }

      return this;
    }
  }, {
    key: 'once',
    value: function once(target, name, handler, priority) {
      if (!(0, _utils.isFunction)(handler)) {
        throw TypeError('Argument 3 must be a function');
      }

      var eventsMap = this;

      function oneTimeHandler(e) {
        eventsMap.off(target, name, oneTimeHandler);

        return handler.call(this, e);
      }

      this.on(target, name, oneTimeHandler, priority);

      var handlers = this[internals].handlers;


      handlers.get(target).get(name).set(handler, oneTimeHandler);

      return this;
    }
  }, {
    key: 'off',
    value: function off() {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var useCapture = (0, _utils.isBoolean)(args[args.length - 1]) ? args.pop() : false;
      var target = args[0],
          name = args[1],
          handler = args[2];


      if (target != null && !(0, _utils.isEventTarget)(target)) {
        throw TypeError('Argument 1 must be an event target');
      }

      if (name != null && !(0, _utils.isString)(name)) {
        throw TypeError('Argument 2 must be a string');
      }

      if (handler != null && !(0, _utils.isFunction)(handler)) {
        throw TypeError('Argument 3 must be a function');
      }

      var handlers = useCapture ? this[internals].captureHandlers : this[internals].bubbleHandlers;

      if (!target) {
        Array.from(handlers.keys()).forEach(function (target) {
          _this.off(target, name, handler, useCapture);
        });

        return this;
      }

      var handlersMap = handlers.get(target);

      if (!name) {
        Array.from(handlersMap.keys()).forEach(function (name) {
          _this.off(target, name, handler, useCapture);
        });

        return this;
      }

      var boundHandlers = handlersMap.get(name);

      if (!handler) {
        Array.from(boundHandlers.keys()).forEach(function (handler) {
          _this.off(target, name, handler, useCapture);
        });

        return this;
      }

      var boundHandler = boundHandlers.get(handler);
      var off = target.off || target.removeEventListener;

      off.call(target, name, boundHandler, useCapture);

      boundHandlers.delete(handler);

      if (!boundHandlers.size) {
        handlersMap.delete(name);
      }

      if (!handlersMap.size) {
        handlers.delete(target);
      }

      return this;
    }
  }, {
    key: 'emit',
    value: function emit(target, name, args) {
      if (!(0, _utils.isEventTarget)(target)) {
        throw TypeError('Argument 1 must be an event target');
      }

      var emit = target.emit || target.trigger;

      if (emit) {
        if (!(0, _utils.isString)(name)) {
          throw TypeError('Argument 2 must be a string');
        }

        if (!(0, _utils.isObject)(args)) {
          throw TypeError('Argument 3 must be an object');
        }

        emit.call(target, name, args);
      } else if (_consts.isBrowser) {
        if ((0, _utils.isString)(name) && !(args instanceof Event)) {
          args = new CustomEvent(name, {
            bubbles: true,
            detail: args
          });
        } else {
          args = name;
        }

        if (!(args instanceof Event)) {
          throw TypeError('Argument 2 must be an event');
        }

        target.dispatchEvent(args);
      } else {
        throw TypeError('dispatchEvent() is only supported in browser');
      }

      return this;
    }
  }]);

  return EventsMap;
}();

exports.default = EventsMap;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var global = exports.global = new Function('return this')();
var document = exports.document = global.document;

var setImmediate = exports.setImmediate = typeof global.setImmediate == 'function' ? global.setImmediate : function (fn) {
  return Promise.resolve().then(fn);
};

var _Symbol = typeof global.Symbol == 'function' ? global.Symbol : function (name) {
  return name;
};
exports.Symbol = _Symbol;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isEventTarget = isEventTarget;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isString = isString;
exports.isObject = isObject;
exports.isFunction = isFunction;
function isEventTarget(target) {
  if (!isObject(target)) {
    return false;
  }

  if (!isFunction(target.addEventListener) && !isFunction(target.on)) {
    return false;
  }

  if (!isFunction(target.removeEventListener) && !isFunction(target.off)) {
    return false;
  }

  if (!isFunction(target.dispatchEvent) && !isFunction(target.trigger) && !isFunction(target.emit)) {
    return false;
  }

  return true;
}

function isNumber(v) {
  return typeof v == 'number' || v instanceof Number;
}

function isBoolean(v) {
  return typeof v == 'boolean' || v instanceof Boolean;
}

function isString(v) {
  return typeof v == 'string' || v instanceof String;
}

function isObject(v) {
  return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) == 'object' || v instanceof Object;
}

function isFunction(v) {
  return typeof v == 'function';
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);