class Observer {
  constructor (data) {
    this.data = data
    this.walk(data)
    this.subscribers = {}
  }
  // traverse data
  walk (data, path) { // 依次将对象属性变成访问器属性
    Object.keys(data).forEach(key => { // 遍历原始数据的key,传入defineReactive使各个属性成为访问器属性
      this.defineReactive(data, key, data[key], path)
    })
  }
  // observe deeply if Object
  observe (value, path) { // 判断对象属性是否还是对象，决定是否继续defineReactive
    if (!value || typeof value !== 'object') return
    if (path) path = path + '.' // 将深层次嵌套的keyp拼成键路径
    this.walk(value, path)
  }
  // binding
  defineReactive (obj, key, val, path) {
    if (!path) path = key // 没有传入path则把key当做path
    else path = path + key // 传入了path则说明是嵌套的对象属性
    // 调用observe处理对象
    // debugger
    this.observe(val, path) // 传给observe的path是父级依次向下的
    // 调用Object.defineProperty对成员进行监视
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        console.log('你访问了' + key)
        return val
      },
      set: newVal => {
        // debugger
        if (newVal === val) return
        // 在这里发布事件 (实际上setter中形成的闭包保存了path!)
        this.$notify(path) // 根据键路径触发事件
        this.observe(newVal, path) // 重新复制新对象
      }
    })
  }
  // 暴露的api
  $watch (key, cb) { // 订阅事件
    if (typeof cb !== 'function') {
      console.log('回调函数必须是一个函数！')
      return
    }
    if (!this.subscribers[key]) this.subscribers[key] = [] // 将监听函数放入事件总线
    this.subscribers[key].push(cb) // 使用关联数组存放监听函数
  }
  // 发布器 - 根据键路径通知事件总线触发
  $notify (path) {
    /**
     * 重点！！！
     * 因为需要根据内层成员发生改变，事件依次向外冒泡触发
     * 所以，在触发事件的时候，应该遍历每一层上注册的事件，依次触发
     * 例如对象结构为：user.name.firstName，那么firstName发生改变，
     * 注册在user、name、firstName上的事件都要响应，这才叫冒泡
     */
    const keys = path.split('.') // 解析键路径[user,name,firstName]
    // depPaths是形为['user', 'user.name', 'user.name.firstName']
    const depPaths = keys.map((key, index) => { // map方法返回回调函数返回值组成的数组
      if (index === 0) {
        return key // 最外层的key
      } else {
        let str = ''
        // debugger
        while (index--) str = keys[index] + '.' + str // 索引小的为父级
        return str + key
      }
    })
    console.log(depPaths)
    depPaths.forEach(path => {
      const fns = this.subscribers[path]
      if (fns && fns.length) { // 同一键上绑定了多个回调
        fns.forEach(fn => { // 与其说是冒泡更像是在DOM中的事件在捕获阶段触发（由根级向下传播）
          fn(this.$getValue(path)) // 取出键值传入
        })
      }
    })
  }
  // 根据键路径取出键值
  $getValue (exp) {
    const path = exp.split('.')
    let val = this.data
    path.forEach(key => {
      val = val[key]
    }) // 得到键路径下的value
    return val
  }
}
window.Observer = Observer

export default Observer
