import CustomEvent from './custom_event';

class EventsMap {
  constructor(context = window) {
    this._context = context;
    this._bubbleEventsMap = new Map();
    this._captureEventsMap = new Map();
  }

  on(eventTarget, eventName, eventHandler, useCapture) {
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
    const eventsMap = useCapture ? this._captureEventsMap : this._bubbleEventsMap;
    let handlersMap = eventsMap.get(eventTarget);

    if (!handlersMap) {
      handlersMap = new Map();
      eventsMap.set(eventTarget, handlersMap);
    }

    let boundHandlersMap = handlersMap.get(eventName);

    if (!boundHandlersMap) {
      boundHandlersMap = new Map();
      handlersMap.set(eventName, boundHandlersMap);
    }

    const boundEventHandler = eventHandler.bind(this._context);

    boundHandlersMap.set(eventHandler, boundEventHandler);

    eventTarget.addEventListener(eventName, boundEventHandler, useCapture);
  }

  once(eventTarget, eventName, eventHandler, useCapture) {
    const fixedEventHandler = (...args) => {
      this.off(eventTarget, eventName, fixedEventHandler, useCapture);

      return eventHandler.apply(this._context, args);
    };

    this.on(eventTarget, eventName, fixedEventHandler, useCapture);
  }

  off(eventTarget, eventName, eventHandler, useCapture) {
    let eventTargetExists = eventTarget instanceof EventTarget;
    let eventNameExists = typeof eventName == 'string';
    let eventHandlerExists = typeof eventHandler == 'function';

    if (eventTargetExists && eventNameExists && eventHandlerExists) {
      useCapture = !!arguments[3];

      const eventsMap = useCapture ? this._captureEventsMap : this._bubbleEventsMap;

      const handlersMap = eventsMap.get(eventTarget);

      if (!handlersMap) {
        console.warn('Handlers map not found');
        return;
      }

      const boundHandlersMap = handlersMap.get(eventName);

      if (!boundHandlersMap) {
        console.warn('Bound handlers map not found');
        return;
      }

      const boundEventHandler = boundHandlersMap.get(eventHandler);

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
    }
    else if (eventTargetExists && eventNameExists) {
      if (!(eventTarget instanceof EventTarget)) {
        throw TypeError('The first argument must be an event target');
      }

      if (typeof eventName != 'string') {
        throw TypeError('The second argument must be a string');
      }

      useCapture = !!arguments[2];

      const eventsMap = useCapture ? this._captureEventsMap : this._bubbleEventsMap;

      const handlersMap = eventsMap.get(eventTarget);

      if (!handlersMap) {
        console.warn('Handlers map not found');
        return;
      }

      const boundHandlersMap = handlersMap.get(eventName);

      if (!boundHandlersMap) {
        console.warn('Bound handlers map not found');
        return;
      }

      handlersMap.delete(eventName);

      if (handlersMap.size == 0) {
        eventsMap.delete(eventTarget);
      }

      boundHandlersMap.forEach((boundEventHandler, eventHandler) => {
        boundHandlersMap.delete(eventHandler);

        eventTarget.removeEventListener(eventName, boundEventHandler, useCapture);
      });
    }
    else if (eventTargetExists) {
      if (!(eventTarget instanceof EventTarget)) {
        throw TypeError('The first argument must be an event target');
      }

      useCapture = !!arguments[1];

      const eventsMap = useCapture ? this._captureEventsMap : this._bubbleEventsMap;

      const handlersMap = eventsMap.get(eventTarget);

      if (!handlersMap) {
        console.warn('Handlers map not found');
        return;
      }

      eventsMap.delete(eventTarget);

      handlersMap.forEach((boundHandlersMap, eventName) => {
        handlersMap.delete(eventName);

        boundHandlersMap.forEach((boundEventHandler, eventHandler) => {
          boundHandlersMap.delete(eventHandler);

          eventTarget.removeEventListener(eventName, boundEventHandler, useCapture);
        });
      });
    }
    else {
      useCapture = !!arguments[0];

      const eventsMap = useCapture ? this._captureEventsMap : this._bubbleEventsMap;

      eventsMap.forEach((handlersMap, eventTarget) => {
        eventsMap.delete(eventTarget);

        handlersMap.forEach((boundHandlersMap, eventName) => {
          handlersMap.delete(eventName);

          boundHandlersMap.forEach((boundEventHandler, eventHandler) => {
            boundHandlersMap.delete(eventHandler);

            eventTarget.removeEventListener(eventName, boundEventHandler, useCapture);
          });
        });
      });
    }
  }

  emit(eventTarget, eventName, eventParams) {
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

    const event = new CustomEvent(eventName, eventParams);

    eventTarget.dispatchEvent(event);
  }
}

export default EventsMap;
