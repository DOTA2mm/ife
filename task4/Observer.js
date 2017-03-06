import Event from './Event'

class Observer {
  constructor (data) {
    this.data = data
    this.walk(data)
    this.eventsBus = {} // 在构造器中添加事件总线
  }
  walk (data, path) {
    if (!data || typeof data !== 'object') return // 传入的是非对象
    
    Object.keys(data).forEach(key => { // for-in 会枚举其原型链上的属性而Object.keys不会
      if (typeof data[key] === 'object') { // 深层次嵌套
        new Observer(data[key])
      }
      this.convert(key, data[key], path)
    })
  }
  observe (value, path) {

  }
  convert (key, value, path) {
    let self = this
    if (!path) {
      path = key
    } else {
      path += '.' + key
    }
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get () {
        console.log('你访问了：' + key)
        return value
      },
      set (newVal) {
        if (newVal === value) return
        // console.log('你设置了：' + key + ',新的 ' + key + ' = ' + newVal)
        self.$notify(path || key)
        if (newVal && typeof newVal === 'object') { // 设置的新值是一个对象
          new Observer(newVal)
        }
        value = newVal
      }
    })
  }
  $watch (type, handler) { // 订阅事件
    if (typeof handler === 'function') {
      if (!this.eventsBus[type]) this.eventsBus[type] = []
      this.eventsBus[type].push(handler)
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
