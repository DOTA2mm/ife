class Observer {
  constructor (data = {}) {
    this.data = data
    this.walk(data)
  }
  walk (data) {
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'object') {
        new Observer(data[key])
      }
      this.convert(key, data[key])
    })
  }
  convert (key, value) {
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get () {
        console.log('你访问了：' + key)
        return value
      },
      set (newVal) {
        console.log('你设置了：' + key + ',新的 ' + key + ' = ' + newVal)
        if (newVal === value) return
        value = newVal
      }
    })
  }
}

window.Observer = Observer // 使打包后能正常访问到Observer