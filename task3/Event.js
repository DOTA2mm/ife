class Event {
  constructor  () {
    this.events = {}
  }
  // 添加事件
  on (type, handler) {
    if (!this.events[type]) { // 第一次为该类型添加处理函数
      this.events[type] = [handler] // 使用数组来保存同一类型下的事件处理函数
    } else {
      this.events[type].push(handler)      
    }
  }
  // 取消事件
  off (type) {
    this.events.keys().forEach(key => { // 遍历事件对象，从中移除要取消的事件
      if (key === type) delete this.events[key]
    })
  }
  // 触发事件
  emit (type, ...args) {
    this.events[type] && this.events[type].forEach(handler => handler(...args)) // 两次使用...运算符，避免保存局部变量
  }
}

export default Event