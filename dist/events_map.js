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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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

  var self = document.createEvent('CustomEvent');

  self.initCustomEvent(eventName, eventParams.bubbles, eventParams.cancelable, eventParams.detail);

  return self;
}

CustomEvent.prototype = Object.create(window.Event.prototype);
CustomEvent.prototype.constructor = CustomEvent;

exports.default = CustomEvent;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events_map = __webpack_require__(3);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_events_map).default;
  }
});

var _custom_event = __webpack_require__(0);

Object.defineProperty(exports, 'CustomEvent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_custom_event).default;
  }
});

var _event_target = __webpack_require__(2);

Object.defineProperty(exports, 'EventTarget', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_event_target).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _custom_event = __webpack_require__(0);

var _custom_event2 = _interopRequireDefault(_custom_event);

var _utils = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EventTarget() {
  var self = {
    _listeners: {},
    _pendingEvents: {}
  };

  Object.setPrototypeOf(self, this.constructor.prototype);

  return self;
}

EventTarget.prototype = Object.create(window.EventTarget.prototype);
EventTarget.prototype.constructor = EventTarget;

EventTarget.prototype.addEventListener = function addEventListener(type, callback) {
  if (!type) {
    throw TypeError('Type must be provided');
  }

  if (typeof type != 'string') {
    throw TypeError('Type must be a string');
  }

  if (!callback) {
    throw TypeError('Callback must be provided');
  }

  if (typeof callback != 'function') {
    throw TypeError('Callback must be a function');
  }

  if (!(type in this._listeners)) {
    this._listeners[type] = [];
  }

  this._listeners[type].push(callback);
};

EventTarget.prototype.removeEventListener = function removeEventListener(type, callback) {
  if (!type) {
    throw TypeError('Type must be provided');
  }

  if (typeof type != 'string') {
    throw TypeError('Type must be a string');
  }

  if (!callback) {
    throw TypeError('Callback must be provided');
  }

  if (typeof callback != 'function') {
    throw TypeError('Callback must be a function');
  }

  if (!(type in this._listeners)) {
    return;
  }

  var stack = this._listeners[type];

  for (var i = 0, l = stack.length; i < l; i++) {
    if (stack[i] === callback) {
      stack.splice(i, 1);
      return;
    }
  }
};

EventTarget.prototype.dispatchEvent = function dispatchEvent(event) {
  var _this = this;

  if (!event) {
    throw TypeError('Event must be provided');
  }

  if (!(event instanceof Event)) {
    throw TypeError('First argument must be an event');
  }

  if (!(event.type in this._listeners)) {
    return true;
  }

  var stack = this._listeners[event.type];

  Object.defineProperty(event, 'target', {
    configurable: true,
    get: function get() {
      return _this;
    }
  });

  for (var i = 0, l = stack.length; i < l; i++) {
    stack[i].call(this, event);
  }

  return !event.defaultPrevented;
};

EventTarget.prototype.silence = function silence(fn) {
  if (this._silenced) return;

  this._silenced = true;
  var dispatchEvent = this.dispatchEvent;
  var result = void 0;

  try {
    this.dispatchEvent = Function();
    result = fn.call(this);
  } finally {
    this._silenced = false;
    this.dispatchEvent = dispatchEvent;
  }

  return result;
};

EventTarget.prototype.queueEvent = function queueEvent(eventName, onQueue, onDequeue) {
  var _this2 = this;

  if (this._pendingEvents[eventName] || this._silenced) return;

  onQueue = onQueue || Function();
  onDequeue = onDequeue || Function();
  var detail = {};

  onQueue(detail);

  var immediate = (0, _utils.setImmediate)(function () {
    delete _this2._pendingEvents[eventName];

    onDequeue(detail);

    _this2.dispatchEvent(new _custom_event2.default(eventName, { detail: detail }));
  });

  this._pendingEvents[eventName] = immediate;
};

EventTarget.prototype.clearEvent = function clearEvent(eventName) {
  var immediate = this._pendingEvents[eventName];

  if (!immediate) return;

  (0, _utils.clearImmediate)(immediate);

  delete this._pendingEvents[eventName];
};

exports.default = EventTarget;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _custom_event = __webpack_require__(0);

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
      if (typeof eventTarget == 'string') {
        useCapture = eventHandler;
        eventHandler = eventName;
        eventName = eventTarget;
        eventTarget = this._context;
      }

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

      if (typeof eventTarget == 'string') {
        useCapture = eventHandler;
        eventHandler = eventName;
        eventName = eventTarget;
        eventTarget = this._context;
      }

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

      var boundEventHandler = function boundEventHandler() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this.off(eventTarget, eventName, eventHandler, useCapture);

        return eventHandler.apply(_this._context, args);
      };

      boundHandlersMap.set(eventHandler, boundEventHandler);

      eventTarget.addEventListener(eventName, boundEventHandler, useCapture);
    }
  }, {
    key: 'off',
    value: function off(eventTarget, eventName, eventHandler, useCapture) {
      if (typeof eventTarget == 'string') {
        useCapture = eventHandler;
        eventHandler = eventName;
        eventName = eventTarget;
        eventTarget = this._context;
      }

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
      if (typeof eventTarget == 'string') {
        eventParams = eventName;
        eventName = eventTarget;
        eventTarget = this._context;
      }

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;
function setImmediate(fn) {
  return (window.setImmediate || setTimeout)(fn);
}

function clearImmediate(id) {
  return (window.clearImmediate || clearTimeout)(id);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);