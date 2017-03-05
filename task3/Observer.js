import Event from './Event'

class Observer {
  constructor (data) {
    this.data = data
    this.walk(data)
    this.eventsBus = new Event() // 在构造器中添加事件主机
  }
  walk (data) {
    if (!data) return
    Object.keys(data).forEach(key => { // for-in 会枚举其原型链上的属性而Object.keys不会
      if (typeof data[key] === 'object') {
        new Observer(data[key])
      }
      this.convert(key, data[key])
    })
  }
  convert (key, value) {
    let self = this
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
        self.eventsBus.emit(key, value, newVal) // 设置新值的时候触发事件
        if (newVal && typeof newVal === 'object') { // 设置的新值是一个对象
          new Observer(newVal)
        }
        value = newVal
      }
    })
  }
  $watch (type, handler) {
    this.eventsBus.on(type, handler)
  }
}

window.Observer = Observer

export default Observer
