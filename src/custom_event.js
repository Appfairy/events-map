function CustomEvent(eventName, eventParams = {}) {
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

  const self = document.createEvent('CustomEvent');

  self.initCustomEvent(
    eventName,
    eventParams.bubbles,
    eventParams.cancelable,
    eventParams.detail
  );

  return self;
}

CustomEvent.prototype = Object.create(window.Event.prototype);
CustomEvent.prototype.constructor = CustomEvent;

export default CustomEvent;
