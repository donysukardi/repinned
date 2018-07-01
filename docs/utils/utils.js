function unwrapArray(arg, defaultValue) {
  const _arg = Array.isArray(arg)
    ? /* istanbul ignore next (preact) */ arg[0]
    : arg
  if (!_arg && defaultValue) {
    return defaultValue
  } else {
    return _arg
  }
}

export { unwrapArray }
