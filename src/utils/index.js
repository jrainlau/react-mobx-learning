export const bridge = (vm) => {
  Object.keys(vm.$data).forEach((prop) => {
    Object.defineProperty(vm, prop, {
      enumerable: true,
      configurable: true,
      get() {
        return vm.$data[prop]
      },
      set(val) {
        vm.$data[prop] = val
      }
    })
  })
}
