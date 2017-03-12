// 依赖收集

let uid = 0

class Dep {
  constructor () {
    this.id = uid++
    this.subs = []
  }
  /**
   * 添加订阅者
   * @param {Watcher} sub watcher实例
   */
  addSub (sub) {
    this.subs.push(sub)
  }

  depend () {
    if (Dep.target) Dep.target.addDep(this)
  }

  notify () {
    this.subs.forEach(sub => sub.update())
  }
}

Dep.target = null

export default Dep
