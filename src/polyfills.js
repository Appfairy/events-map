export const global = new Function('return this')()
export const document = global.document

export const setImmediate = typeof global.setImmediate == 'function'
  ? global.setImmediate
  : fn => Promise.resolve().then(fn)

export const Symbol = typeof global.Symbol == 'function'
  ? global.Symbol
  : name => name
