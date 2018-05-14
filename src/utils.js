export function isEventTarget(target) {
  if (!isObject(target)) {
    return false
  }

  if (
    !isFunction(target.addEventListener) &&
    !isFunction(target.on)
  ) {
    return false
  }

  if (
    !isFunction(target.removeEventListener) &&
    !isFunction(target.off)
  ) {
    return false
  }

  if (
    !isFunction(target.dispatchEvent) &&
    !isFunction(target.trigger) &&
    !isFunction(target.emit)
  ) {
    return false
  }

  return true
}

export function isNumber(v) {
  return typeof v == 'number' || v instanceof Number
}

export function isBoolean(v) {
  return typeof v == 'boolean' || v instanceof Boolean
}

export function isString(v) {
  return typeof v == 'string' || v instanceof String
}

export function isObject(v) {
  return typeof v == 'object' || v instanceof Object
}

export function isFunction(v) {
  return typeof v == 'function'
}
