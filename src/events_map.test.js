import EventsMap from './events_map';

describe('EventsMap class', () => {
  let eventsMap;
  let eventTarget;

  beforeEach(() => {
    eventsMap = new EventsMap();
    eventTarget = document.createElement('div');
  });

  describe('on() method', () => {
    test('event registration', (next) => {
      eventsMap.on(eventTarget, 'test', next);
      eventsMap.emit(eventTarget, 'test');
    });
  });

  describe('once() method', () => {
    test('one time event registration', (next) => {
      let called = false;

      eventsMap.once(eventTarget, 'test', () => {
        if (called) {
          return next.fail('event was already called');
        }

        called = true;
      });

      eventsMap.on(eventTarget, 'next', next);

      eventsMap.emit(eventTarget, 'test');
      eventsMap.emit(eventTarget, 'test');
      eventsMap.emit(eventTarget, 'next');
    });
  });

  describe('off() method', () => {
    describe('bubbling', () => {
      test('event target, event name, event handler specification', (next) => {
        let called = false;

        const eventHandler = () => {
          if (called) {
            return next.fail('handler was already called');
          }

          called = true;
        };

        eventsMap.on(eventTarget, 'test', eventHandler, false);
        eventsMap.on(eventTarget, 'next', next, false);

        eventsMap.emit(eventTarget, 'test');

        eventsMap.off(eventTarget, 'test', eventHandler, false);

        eventsMap.emit(eventTarget, 'test');
        eventsMap.emit(eventTarget, 'next');
      });

      test('event target, event name specification', (next) => {
        let called = false;

        const eventHandler = () => {
          if (called) {
            return next.fail('handler was already called');
          }

          called = true;
        };

        eventsMap.on(eventTarget, 'test', eventHandler, false);
        eventsMap.on(eventTarget, 'next', next, false);

        eventsMap.emit(eventTarget, 'test');

        eventsMap.off(eventTarget, 'test', false);

        eventsMap.emit(eventTarget, 'test');
        eventsMap.emit(eventTarget, 'next');
      });
    });

    describe('capturing',  () => {
      test('event target, event name, event handler specification', (next) => {
        let called = false;

        const eventHandler = () => {
          if (called) {
            return next.fail('handler was already called');
          }

          called = true;
        };

        eventsMap.on(eventTarget, 'test', eventHandler, true);
        eventsMap.on(eventTarget, 'next', next, true);

        eventsMap.emit(eventTarget, 'test');

        eventsMap.off(eventTarget, 'test', eventHandler, true);

        eventsMap.emit(eventTarget, 'test');
        eventsMap.emit(eventTarget, 'next');
      });

      test('event target, event name specification', (next) => {
        let called = false;

        const eventHandler = () => {
          if (called) {
            return next.fail('handler was already called');
          }

          called = true;
        };

        eventsMap.on(eventTarget, 'test', eventHandler, true);
        eventsMap.on(eventTarget, 'next', next, true);

        eventsMap.emit(eventTarget, 'test');

        eventsMap.off(eventTarget, 'test', true);

        eventsMap.emit(eventTarget, 'test');
        eventsMap.emit(eventTarget, 'next');
      });
    });
  });
});
