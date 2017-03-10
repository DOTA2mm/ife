import Compile from './compile'

class MVVM {
  /**
   * 主构造器
   * @param {Object} options 选项对象，包括要绑定的data,和页面元素el
   */
  constructor (options) {
    const data = this._data = options.data
    Object.keys(data).forEach(key => this._proxy(key))
    new Compile(options.el || document.body, this)
  }
  // 代理实例中的data,使vm.key等同于vm._data.key
  _proxy (key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () => this._data[key],
      set: newVal => {
        this._data[key] = newVal
      }
    })
  }
}

window.MVVM = MVVM
