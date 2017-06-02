import CustomEvent from './custom_event';

function EventTarget() {
  const self = {
    _listeners: {}
  };

  Object.setPrototypeOf(self, this.constructor.prototype);

  return self;
}

EventTarget.prototype = Object.create(window.EventTarget.prototype);
EventTarget.prototype.constructor = EventTarget;

EventTarget.emit = function emit(eventTarget, eventName, eventParams) {
  if (!eventTarget) {
    throw TypeError('An event target must be provided');
  }

  if (!(eventTarget instanceof window.EventTarget)) {
    throw TypeError('The first argument must be an event target');
  }

  if (!eventName) {
    throw TypeError('An event name must be provided');
  }

  if (typeof eventName != 'string') {
    throw TypeError('The second argument must be a string');
  }

  const event = new CustomEvent(eventName, eventParams);

  eventTarget.dispatchEvent(event);
};

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
}

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

  const stack = this._listeners[type];

  for (let i = 0, l = stack.length; i < l; i++) {
    if (stack[i] === callback){
      stack.splice(i, 1);
      return;
    }
  }
}

EventTarget.prototype.dispatchEvent = function dispatchEvent(event) {
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

export default EventTarget;
