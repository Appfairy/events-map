import EventsMap from './events_map'

describe('EventsMap class', () => {
  let eventsMap
  let eventTarget

  beforeEach(() => {
    eventTarget = document.createElement('div')

    eventTarget.appendChild(document.createElement('div'))
    document.createElement('div').appendChild(eventTarget)

    eventsMap = new EventsMap({ rootNode: eventTarget.parentElement })
  })

  describe('on() method', () => {
    describe('event registration', () => {
      test('capturing', (next) => {
        let childCalled

        eventsMap.on(eventTarget.parentElement, 'test', () => {
          if (!childCalled) {
            next.fail('Child should have been called first')
          }

          next()
        })

        eventsMap.on(eventTarget, 'test', () => {
          childCalled = true
        })

        eventsMap.emit(eventTarget, 'test')
      })

      test('bubbling', (next) => {
        let parentCalled

        eventsMap.on(eventTarget, 'test', () => {
          if (!parentCalled) {
            next.fail('Parent should have been called first')
          }

          next()
        }, true)

        eventsMap.on(eventTarget.parentElement, 'test', () => {
          parentCalled = true
        }, true)

        eventsMap.emit(eventTarget, 'test')
      })

      test('prioritizing', (next) => {
        let parentCalled
        let childCalled

        eventsMap.on(eventTarget, 'test', () => {
          if (!parentCalled && !childCalled) {
            next.fail('Parent and child should have been called first')
          }

          next()
        }, 3)

        eventsMap.on(eventTarget.firstElementChild, 'test', () => {
          if (!parentCalled) {
            next.fail('Parent should have been called first')
          }

          childCalled = true
        }, 2)

        eventsMap.on(eventTarget.parentElement, 'test', () => {
          parentCalled = true
        }, 1)

        eventsMap.emit(eventTarget.firstElementChild, 'test')
      })
    })
  })

  test('once() method', (next) => {
    let called = false

    eventsMap.once(eventTarget, 'test', () => {
      if (called) {
        return next.fail('event was already called')
      }

      called = true
    })

    eventsMap.on(eventTarget, 'next', next)

    eventsMap.emit(eventTarget, 'test')
    eventsMap.emit(eventTarget, 'test')
    eventsMap.emit(eventTarget, 'next')
  })

  describe.only('off() method', () => {
    describe('bubbling', () => {
      test('event target, event name, event handler specification', (next) => {
        let called = false

        const eventHandler = () => {
          if (called) {
            return next.fail('handler was already called')
          }

          called = true
        }

        eventsMap.on(eventTarget, 'test', eventHandler, false)
        eventsMap.on(eventTarget, 'next', next, false)

        eventsMap.emit(eventTarget, 'test')

        eventsMap.off(eventTarget, 'test', eventHandler, false)

        eventsMap.emit(eventTarget, 'test')
        eventsMap.emit(eventTarget, 'next')
      })

      test('event target, event name specification', (next) => {
        let called = false

        const eventHandler = () => {
          if (called) {
            return next.fail('handler was already called')
          }

          called = true
        }

        eventsMap.on(eventTarget, 'test', eventHandler, false)
        eventsMap.on(eventTarget, 'next', next, false)

        eventsMap.emit(eventTarget, 'test')

        eventsMap.off(eventTarget, 'test', false)

        eventsMap.emit(eventTarget, 'test')
        eventsMap.emit(eventTarget, 'next')
      })
    })

    describe('capturing',  () => {
      test('event target, event name, event handler specification', (next) => {
        let called = false

        const eventHandler = () => {
          if (called) {
            return next.fail('handler was already called')
          }

          called = true
        }

        eventsMap.on(eventTarget, 'test', eventHandler, true)
        eventsMap.on(eventTarget, 'next', next, true)

        eventsMap.emit(eventTarget, 'test')

        eventsMap.off(eventTarget, 'test', eventHandler, true)

        eventsMap.emit(eventTarget, 'test')
        eventsMap.emit(eventTarget, 'next')
      })

      test('event target, event name specification', (next) => {
        let called = false

        const eventHandler = () => {
          if (called) {
            return next.fail('handler was already called')
          }

          called = true
        }

        eventsMap.on(eventTarget, 'test', eventHandler, true)
        eventsMap.on(eventTarget, 'next', next, true)

        eventsMap.emit(eventTarget, 'test')

        eventsMap.off(eventTarget, 'test', true)

        eventsMap.emit(eventTarget, 'test')
        eventsMap.emit(eventTarget, 'next')
      })
    })
  })
})
