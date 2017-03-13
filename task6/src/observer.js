import Dep from './dep'

/**
 * 对传入主构造器中的data成员进行监视
 * @constructor
 */
class Observer {
  constructor (value) {
    this.value = value
    this.dep = new Dep()
    this.walk(value)
    Object.defineProperty(value, '__ob__', { // 为传入构造器的对象添加不可枚举的属性__ob__指向Observer实例
      value: this,
      writable: true,
      enumerable: false,
      configurable: true
    })
  }

  walk (obj) {
    Object.keys(obj).forEach((key) => {
      this.defineReactive(obj, key, obj[key])
    })
  }

  defineReactive (obj, key, val) {
    const dep = new Dep()
    let childOb = observe(val)

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        if (Dep.target) {
          dep.depend()
          if (childOb) childOb.dep.depend()
        }
        return val
      },
      set: newVal => {
        if (newVal === val) return
        val = newVal
        childOb = observe(newVal)
        dep.notify()
      }
    })
  }
}

const hasOwn = (obj, key) => Object.hasOwnProperty.call(obj, key)

/**
 * 监视data深层次嵌套的对象
 * @param {Object} value 添加监视的对象
 * @return {Object} ob
 */
const observe = value => {
  if (!value || typeof value !== 'object') return
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}

export {observe}
