import { isBrowser } from './consts'

import {
  global,
  document,
  setImmediate,
  Symbol
} from './polyfills'

import {
  isEventTarget,
  isNumber,
  isBoolean,
  isString,
  isObject,
  isFunction
} from './utils'

const internals = Symbol('__events_map__')

class EventsMap {
  constructor(options = {}) {
    if (!isObject(options)) {
      throw TypeError('options must be an object')
    }

    const { context, rootNode } = {
      context: global,
      rootNode: document,
      ...options
    }

    if (!isObject(context)) {
      throw TypeError('options.context must be an object')
    }

    if (rootNode != null && !isEventTarget(rootNode)) {
      throw TypeError('options.rootNode must be an event target')
    }

    this[internals] = {
      context,
      rootNode,
      handlers: new Map()
    }
  }

  on(target, name, handler, priority = false) {
    let useCapture

    if (!isEventTarget(target)) {
      throw TypeError('Argument 1 must be an event target')
    }

    if (!isString(name)) {
      throw TypeError('Argument 2 must be a string')
    }

    if (!isFunction(handler)) {
      throw TypeError('Argument 3 must be a function')
    }

    if (isNumber(priority)) {
      if (priority <= 0) {
        throw TypeError('Priority must be 0 or greater')
      }

      useCapture = false
    }
    else if (isBoolean(priority)) {
      useCapture = priority
      priority = null
    }
    else {
      throw TypeError('Argument 4 must be a number or a boolean')
    }

    const { context, handlers, rootNode } = this[internals]

    let handlersMap = handlers.get(target)

    if (!handlersMap) {
      handlersMap = new Map()
      handlers.set(target, handlersMap)
    }

    let boundHandlers = handlersMap.get(name)

    if (!boundHandlers) {
      boundHandlers = new Map()
      handlersMap.set(name, boundHandlers)
    }

    const boundHandler = (e) => {
      if (!rootNode || !isNumber(priority)) {
        return handler.call(context, e)
      }

      let handlingQueues

      if (rootNode[internals]) {
        handlingQueues = rootNode[internals].handlingQueues
      }
      else {
        handlingQueues = {}
        rootNode[internals] = { handlingQueues }

        const executor = () => {
          Object.keys(handlingQueues).sort().forEach((queueIndex) => {
            const handlingQueue = handlingQueues[queueIndex]

            handlingQueue.forEach((handler) => {
              handler.call(context, e)
            })
          })
        }

        rootNode[internals].executor = executor

        setImmediate(() => {
          delete rootNode[internals]

          rootNode.removeEventListener(e.type, executor)
        })

        rootNode.addEventListener(e.type, executor)
      }

      let handlingQueue = handlingQueues[priority]

      if (!handlingQueue) {
        handlingQueue = []
        handlingQueues[priority] = handlingQueue
      }

      handlingQueue.push(handler)
    }

    boundHandler[internals] = { useCapture }

    boundHandlers.set(handler, boundHandler)

    const on = target.addEventListener || target.on

    on.call(target, name, boundHandler, useCapture)

    // Push the executor to the top of the execution queue
    if (target === rootNode && rootNode[internals]) {
      rootNode.removeEventListener(name, rootNode[internals].executor)
      rootNode.addEventListener(name, rootNode[internals].executor)
    }

    return this
  }

  once(target, name, handler, priority) {
    if (!isFunction(handler)) {
      throw TypeError('Argument 3 must be a function')
    }

    const eventsMap = this

    function oneTimeHandler(e) {
      eventsMap.off(target, name, oneTimeHandler)

      return handler.call(this, e)
    }

    this.on(target, name, oneTimeHandler, priority)

    const { handlers } = this[internals]

    handlers.get(target).get(name).set(handler, oneTimeHandler)

    return this
  }

  off(target, name, handler) {
    if (target != null && !isEventTarget(target)) {
      throw TypeError('Argument 1 must be an event target')
    }

    if (name != null && !isString(name)) {
      throw TypeError('Argument 2 must be a string')
    }

    if (handler != null && !isFunction(handler)) {
      throw TypeError('Argument 3 must be a function')
    }

    const { handlers } = this[internals]

    if (!target) {
      Array.from(handlers.keys()).forEach((target) => {
        this.off(target, name, handler)
      })

      return this
    }

    const handlersMap = handlers.get(target)

    if (!name) {
      Array.from(handlersMap.keys()).forEach((name) => {
        this.off(target, name, handler)
      })

      return this
    }

    const boundHandlers = handlersMap.get(name)

    if (!handler) {
      Array.from(boundHandlers.keys()).forEach((handler) => {
        this.off(target, name, handler)
      })

      return this
    }

    const boundHandler = boundHandlers.get(handler)
    const useCapture = boundHandler[internals].useCapture
    const off = target.off || target.removeEventListener

    off.call(target, name, boundHandler, useCapture)

    return this
  }

  emit(target, name, args) {
    if (!isEventTarget(target)) {
      throw TypeError('Argument 1 must be an event target')
    }

    const emit = target.emit || target.trigger

    if (emit) {
      if (!isString(name)) {
        throw TypeError('Argument 2 must be a string')
      }

      if (!isObject(args)) {
        throw TypeError('Argument 3 must be an object')
      }

      emit.call(target, name, args)
    }
    else if (isBrowser) {
      if (isString(name) && !(args instanceof Event)) {
        args = new CustomEvent(name, {
          bubbles: true,
          detail: args
        })
      }
      else {
        args = name
      }

      if (!(args instanceof Event)) {
        throw TypeError('Argument 2 must be an event')
      }

      target.dispatchEvent(args)
    }
    else {
      throw TypeError('dispatchEvent() is only supported in browser')
    }

    return this
  }
}

export default EventsMap
