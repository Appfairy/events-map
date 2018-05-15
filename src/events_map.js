import { isBrowser } from './consts'

import {
  global,
  document,
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
      captureHandlers: new Map(),
      bubbleHandlers: new Map()
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

    // Last argument will either represent useCapture or priority
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

    const { context, rootNode } = this[internals]

    const handlers = useCapture
      ? this[internals].captureHandlers
      : this[internals].bubbleHandlers

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
      // If rootNode wasn't specified or there's not priority to this handler than
      // execute normally
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

        // This will be the handler which will execute all the queued event handlers
        // in series based on their priority
        const executor = () => {
          // Sorting tasks based on their priority.
          // A lower number represents a higher priority
          Object.keys(handlingQueues).sort().forEach((queueIndex) => {
            const handlingQueue = handlingQueues[queueIndex]

            handlingQueue.forEach((handler) => {
              // Error will only be printed without interrupting the execution queue
              try {
                handler.call(context, e)
              }
              catch (error) {
                console.error(error)
              }
            })

            // Dispose queue related data
            delete rootNode[internals]

            rootNode.removeEventListener(e.type, executor)
          })
        }

        // For future use when we would like to re-register the executor handler
        rootNode[internals].executor = executor

        // Despite adding the executor during run-time it will still be executed as if
        // it was registered in advance
        rootNode.addEventListener(e.type, executor)
      }

      let handlingQueue = handlingQueues[priority]

      if (!handlingQueue) {
        handlingQueue = []
        handlingQueues[priority] = handlingQueue
      }

      handlingQueue.push(handler)
    }

    boundHandlers.set(handler, boundHandler)

    const on = target.addEventListener || target.on

    on.call(target, name, boundHandler, useCapture)

    // Push the executor to the top of the execution queue so it will always come last
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

    const useCapture = isBoolean(priority) && priority

    const handlers = useCapture
      ? this[internals].captureHandlers
      : this[internals].bubbleHandlers

    // Resetting the bound handler to reference the oneTimeHandler so
    // it can be unregistered by the user afterwards
    handlers.get(target).get(name).set(handler, oneTimeHandler)

    return this
  }

  off(...args) {
    // Last boolean argument will always be useCapture
    const useCapture = isBoolean(args[args.length - 1]) ? args.pop() : false
    const [target, name, handler] = args

    if (target != null && !isEventTarget(target)) {
      throw TypeError('Argument 1 must be an event target')
    }

    if (name != null && !isString(name)) {
      throw TypeError('Argument 2 must be a string')
    }

    if (handler != null && !isFunction(handler)) {
      throw TypeError('Argument 3 must be a function')
    }

    const handlers = useCapture
      ? this[internals].captureHandlers
      : this[internals].bubbleHandlers

    // Call for all targets
    if (!target) {
      Array.from(handlers.keys()).forEach((target) => {
        this.off(target, name, handler, useCapture)
      })

      return this
    }

    const handlersMap = handlers.get(target)

    // Call for all names
    if (!name) {
      Array.from(handlersMap.keys()).forEach((name) => {
        this.off(target, name, handler, useCapture)
      })

      return this
    }

    const boundHandlers = handlersMap.get(name)

    // Call for all handlers
    if (!handler) {
      Array.from(boundHandlers.keys()).forEach((handler) => {
        this.off(target, name, handler, useCapture)
      })

      return this
    }

    const boundHandler = boundHandlers.get(handler)
    const off = target.off || target.removeEventListener

    off.call(target, name, boundHandler, useCapture)

    // Run disposals
    boundHandlers.delete(handler)

    if (!boundHandlers.size) {
      handlersMap.delete(name)
    }

    if (!handlersMap.size) {
      handlers.delete(target)
    }

    return this
  }

  trigger(target, name, args) {
    if (!isEventTarget(target)) {
      throw TypeError('Argument 1 must be an event target')
    }

    const trigger = target.emit || target.trigger

    // Probably Node.JS's EventEmitter or a third party library
    if (trigger) {
      if (!isString(name)) {
        throw TypeError('Argument 2 must be a string')
      }

      if (!isObject(args)) {
        throw TypeError('Argument 3 must be an object')
      }

      trigger.call(target, name, args)
    }
    // Probably the browser's EventTarget
    else if (isBrowser) {
      // Wrap args with CustomEvent if plain object was provided
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
