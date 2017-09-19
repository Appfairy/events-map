export function setImmediate(fn) {
  return (window.setImmediate || setTimeout)(fn);
}

export function clearImmediate(id) {
  return (window.clearImmediate || clearTimeout)(id);
}
