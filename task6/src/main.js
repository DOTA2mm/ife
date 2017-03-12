import Compile from './compile'
import {observe} from './observer'
import Watcher from './watcher'

class MVVM {
  constructor (options) {
    const data = this._data = options.data
    this.$options = options
    Object.keys(data).forEach(key => this._proxy(key))
    observe(data)
    new Compile(options.el || document.body, this)
  }

  /**
   * 代理实例中的成员，便携访问_data中的成员
   * @param {String} key _data成员的key
   */
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
  /**
   * 观察实例变化
   * @param {String} exp 键路径
   * @param {Function} cb 监控数据发生改变时的回调函数
   * @param {Object} options 配置对象
   */
  $watch (exp, cb, options) {
    new Watcher(this, exp, cb, options)
  }
}

window.MVVM = MVVM

export default MVVM
