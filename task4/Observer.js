class Observer {
  constructor (data) {
    this.data = data
    this.walk(data)
    this.eventsBus = {} // 在构造器中添加事件总线
  }
  walk (data, path) {
    Object.keys(data).forEach(key => { // for-in 会枚举其原型链上的属性而Object.keys不会
      this.defineReactive(data, key, data[key], path)
    })
  }
  // 深度监控
  observe (value, path) {
    if (!value || typeof value !== 'object') return
    if (path) path = path + '.'
    this.walk(value, path)
  }
  defineReactive (obj, key, value, path) {
    if (!path) {
      path = key
    } else {
      path += '.' + key
    }
    this.observe(value, path)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        console.log('你访问了：' + key)
        return value
      },
      set: (newVal) => {
        if (newVal === value) return
        // console.log('你设置了：' + key + ',新的 ' + key + ' = ' + newVal)
        this.$notify(path || key)
        this.observe(newVal, path)
        value = newVal
      }
    })
  }
  $watch (key, handler) { // 订阅事件
    if (typeof handler === 'function') {
      if (!this.eventsBus[key]) this.eventsBus[key] = []
      this.eventsBus[key].push(handler)
    }
  }
  $notify (path) {
    const keys = path.split('.')
    const depPaths = keys.map((key, index) => {
      if (index === 0) {
        return key
      } else {
        let str = ''
        while (index--) str = keys[index] + '.' + str
        return str + key
      }
    })
    depPaths.forEach(path => {
      const handlers = this.eventsBus[path]
      if (handlers && handlers.length) {
        handlers.forEach(handler => handler(this.$getValue(path)))
      }
    })
  }
  $getValue (exp) {
    const path = exp.split('.')
    let val = this.data
    path.forEach(k => {
      val = val[k]
    })
    return val
  }
}

window.Observer = Observer
export default Observer
