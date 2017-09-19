import CustomEvent from './custom_event';
import { clearImmediate, setImmediate } from './utils';

function EventTarget() {
  this._listeners = {};
  this._pendingEvents = {};
}

EventTarget.prototype = Object.create(window.EventTarget.prototype);
EventTarget.prototype.constructor = EventTarget;

EventTarget.prototype.addEventListener = function (type, callback) {
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
}

EventTarget.prototype.removeEventListener = function (type, callback) {
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

  const stack = this._listeners[type];

  for (let i = 0, l = stack.length; i < l; i++) {
    if (stack[i] === callback){
      stack.splice(i, 1);
      return;
    }
  }
}

EventTarget.prototype.dispatchEvent = function (event) {
  if (!event) {
    throw TypeError('Event must be provided');
  }

  if (!(event instanceof Event)) {
    throw TypeError('First argument must be an event');
  }

  if (!(event.type in this._listeners)) {
    return true;
  }

  const stack = this._listeners[event.type];

  Object.defineProperty(event, 'target', {
    configurable: true,
    get: () => this
  });

  for (let i = 0, l = stack.length; i < l; i++) {
    stack[i].call(this, event);
  }

  return !event.defaultPrevented;
}

EventTarget.prototype.silence = function (fn) {
  if (this._silenced) return;

  this._silenced = true;
  const dispatchEvent = this.dispatchEvent;
  let result;

  try {
    this.dispatchEvent = Function();
    result = fn.call(this);
  }
  finally {
    this._silenced = false;
    this.dispatchEvent = dispatchEvent;
  }

  return result;
};

EventTarget.prototype.queueEvent = function (eventName, onQueue, onDequeue) {
  if (this._pendingEvents[eventName] || this._silenced) return;

  onQueue = onQueue || Function();
  onDequeue = onDequeue || Function();
  const detail = {};

  onQueue(detail);

  const immediate = setImmediate(() => {
    delete this._pendingEvents[eventName];

    onDequeue(detail);

    this.dispatchEvent(new CustomEvent(eventName, { detail }));
  });

  this._pendingEvents[eventName] = immediate;
};

EventTarget.prototype.clearEvent = function (eventName) {
  const immediate = this._pendingEvents[eventName];

  if (!immediate) return;

  clearImmediate(immediate);

  delete this._pendingEvents[eventName];
};

export default EventTarget;
