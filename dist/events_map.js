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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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


Object.defineProperty(exports, "__esModule", {
  value: true
});
function CustomEvent(eventName) {
  var eventParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!eventName) {
    throw TypeError('Event name must be provided');
  }

  if (typeof eventName != 'string') {
    throw TypeError('Event name must be a string');
  }

  if (!(eventParams instanceof Object)) {
    throw TypeError('Event parameters must be an object');
  }

  Object.assign({
    bubbles: true,
    cancelable: true,
    detail: {}
  }, eventParams);

  var event = document.createEvent('CustomEvent');

  event.initCustomEvent(eventName, eventParams.bubbles, eventParams.cancelable, eventParams.detail);

  return event;
}

CustomEvent.prototype = Object.create(window.Event.prototype);
CustomEvent.prototype.constructor = CustomEvent;

exports.default = CustomEvent;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _custom_event = __webpack_require__(1);

var _custom_event2 = _interopRequireDefault(_custom_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventsMap = function () {
  function EventsMap() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

    _classCallCheck(this, EventsMap);

    this._context = context;
    this._bubbleEventsMap = new Map();
    this._captureEventsMap = new Map();
  }

  _createClass(EventsMap, [{
    key: 'on',
    value: function on(eventTarget, eventName, eventHandler, useCapture) {
      if (!eventTarget) {
        throw TypeError('An event target must be provided');
      }

      if (!(eventTarget instanceof EventTarget)) {
        throw TypeError('The first argument must be an event target');
      }

      if (!eventName) {
        throw TypeError('An event name must be provided');
      }

      if (typeof eventName != 'string') {
        throw TypeError('The second argument must be a string');
      }

      if (!eventHandler) {
        throw TypeError('An event handler must be provided');
      }

      if (typeof eventHandler != 'function') {
        throw TypeError('The third argument must be a function');
      }

      useCapture = !!useCapture;
      var eventsMap = useCapture ? this._captureEventsMap : this._bubbleEventsMap;
      var handlersMap = eventsMap.get(eventTarget);

      if (!handlersMap) {
        handlersMap = new Map();
        eventsMap.set(eventTarget, handlersMap);
      }

      var boundHandlersMap = handlersMap.get(eventName);

      if (!boundHandlersMap) {
        boundHandlersMap = new Map();
        handlersMap.set(eventName, boundHandlersMap);
      }

      var boundEventHandler = eventHandler.bind(this._context);

      boundHandlersMap.set(eventHandler, boundEventHandler);

      eventTarget.addEventListener(eventName, boundEventHandler, useCapture);
    }
  }, {
    key: 'once',
    value: function once(eventTarget, eventName, eventHandler, useCapture) {
      var _this = this;

      var fixedEventHandler = function fixedEventHandler() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this.off(eventTarget, eventName, fixedEventHandler, useCapture);

        return eventHandler.apply(_this._context, args);
      };

      this.on(eventTarget, eventName, fixedEventHandler, useCapture);
    }
  }, {
    key: 'off',
    value: function off(eventTarget, eventName, eventHandler, useCapture) {
      var eventTargetExists = eventTarget instanceof EventTarget;
      var eventNameExists = typeof eventName == 'string';
      var eventHandlerExists = typeof eventHandler == 'function';

      if (eventTargetExists && eventNameExists && eventHandlerExists) {
        useCapture = !!arguments[3];

        var eventsMap = useCapture ? this._captureEventsMap : this._bubbleEventsMap;

        var handlersMap = eventsMap.get(eventTarget);

        if (!handlersMap) {
          console.warn('Handlers map not found');
          return;
        }

        var boundHandlersMap = handlersMap.get(eventName);

        if (!boundHandlersMap) {
          console.warn('Bound handlers map not found');
          return;
        }

        var boundEventHandler = boundHandlersMap.get(eventHandler);

        if (!boundEventHandler) {
          console.warn('Bound event handler not found');
          return;
        }

        boundHandlersMap.delete(eventHandler);

        if (boundHandlersMap.size == 0) {
          handlersMap.delete(eventName);
        }

        if (handlersMap.size == 0) {
          eventsMap.delete(eventTarget);
        }

        eventTarget.removeEventListener(eventName, boundEventHandler, useCapture);
      } else if (eventTargetExists && eventNameExists) {
        if (!(eventTarget instanceof EventTarget)) {
          throw TypeError('The first argument must be an event target');
        }

        if (typeof eventName != 'string') {
          throw TypeError('The second argument must be a string');
        }

        useCapture = !!arguments[2];

        var _eventsMap = useCapture ? this._captureEventsMap : this._bubbleEventsMap;

        var _handlersMap = _eventsMap.get(eventTarget);

        if (!_handlersMap) {
          console.warn('Handlers map not found');
          return;
        }

        var _boundHandlersMap = _handlersMap.get(eventName);

        if (!_boundHandlersMap) {
          console.warn('Bound handlers map not found');
          return;
        }

        _handlersMap.delete(eventName);

        if (_handlersMap.size == 0) {
          _eventsMap.delete(eventTarget);
        }

        _boundHandlersMap.forEach(function (boundEventHandler, eventHandler) {
          _boundHandlersMap.delete(eventHandler);

          eventTarget.removeEventListener(eventName, boundEventHandler, useCapture);
        });
      } else if (eventTargetExists) {
        if (!(eventTarget instanceof EventTarget)) {
          throw TypeError('The first argument must be an event target');
        }

        useCapture = !!arguments[1];

        var _eventsMap2 = useCapture ? this._captureEventsMap : this._bubbleEventsMap;

        var _handlersMap2 = _eventsMap2.get(eventTarget);

        if (!_handlersMap2) {
          console.warn('Handlers map not found');
          return;
        }

        _eventsMap2.delete(eventTarget);

        _handlersMap2.forEach(function (boundHandlersMap, eventName) {
          _handlersMap2.delete(eventName);

          boundHandlersMap.forEach(function (boundEventHandler, eventHandler) {
            boundHandlersMap.delete(eventHandler);

            eventTarget.removeEventListener(eventName, boundEventHandler, useCapture);
          });
        });
      } else {
        useCapture = !!arguments[0];

        var _eventsMap3 = useCapture ? this._captureEventsMap : this._bubbleEventsMap;

        _eventsMap3.forEach(function (handlersMap, eventTarget) {
          _eventsMap3.delete(eventTarget);

          handlersMap.forEach(function (boundHandlersMap, eventName) {
            handlersMap.delete(eventName);

            boundHandlersMap.forEach(function (boundEventHandler, eventHandler) {
              boundHandlersMap.delete(eventHandler);

              eventTarget.removeEventListener(eventName, boundEventHandler, useCapture);
            });
          });
        });
      }
    }
  }, {
    key: 'emit',
    value: function emit(eventTarget, eventName, eventParams) {
      if (!eventTarget) {
        throw TypeError('An event target must be provided');
      }

      if (!(eventTarget instanceof EventTarget)) {
        throw TypeError('The first argument must be an event target');
      }

      if (!eventName) {
        throw TypeError('An event name must be provided');
      }

      if (typeof eventName != 'string') {
        throw TypeError('The second argument must be a string');
      }

      var event = new _custom_event2.default(eventName, eventParams);

      eventTarget.dispatchEvent(event);
    }
  }]);

  return EventsMap;
}();

exports.default = EventsMap;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);