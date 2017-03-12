import Watcher from './watcher'

/**
 * 将DOM节点转换成fragment
 * @param {Node} node DOM节点
 */
const toNodeFragment = node => {
  const fragment = document.createDocumentFragment()
  let child
  while (child = node.firstChild) fragment.appendChild(child) // eslint-disable-line
  return fragment
}

const isElementNode = node => node.nodeType === 1
const isTextNode = node => node.nodeType === 3
const isDirective = dir => (
  dir.indexOf('v-') === 0 || // v-model等指令
  dir.indexOf('@') === 0 || // v-on 事件绑定的简写指令
  dir.indexOf(':') === 0 // v-bind 属性绑定简写指令
)

const isEventDirective = dir => dir.indexOf('v-on') === 0 || dir.indexOf('@') === 0

const _slice = Array.prototype.slice

class Compile {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = isElementNode(el) ? el : document.querySelector(el)
    if (this.$el) {
      this.$fragment = toNodeFragment(this.$el)
      this.compileElements(this.$fragment.childNodes)
      this.$el.appendChild(this.$fragment)
    }
  }

  compileElements (nodes) {
    nodes = _slice.call(nodes)
    nodes.forEach(node => {
      if (isElementNode(node)) this.compile(node)
      else if (isTextNode(node)) {
        const reg = /\{\{(.+?)}}/g
        let match = reg.exec(node.nodeValue)
        if (match) {
          this.compileText(node, match[1], match.index)
        }
      }
      const childNodes = node.childNodes
      if (childNodes && childNodes.length) {
        this.compileElements(childNodes) // 递归编译子节点
      }
    })
  }

  compileText (node, exp, index) {
    compileUnit.text(node, this.$vm, exp)
  }

  compile (node) {
    const attrs = _slice.call(node.attributes)
    attrs.forEach(attr => {
      const attrName = attr.name
      const exp = attr.value
      if (isDirective(attrName)) {
        if (isEventDirective(attrName)) { // 事件指令
          compileUnit.eventHandler(node, this.$vm, exp, attrName)
        } else {
          const dir = attrName.slice(2) // 非事件指令
          compileUnit[dir] && compileUnit[dir](node, this.$vm, exp)
        }
        node.removeAttribute(attrName)
      }
    })
  }
}

const updater = {
  textUpdater (node, value, oldValue) {
    console.log(oldValue)
    node.nodeValue = node.nodeValue.replace(oldValue, value)
  },
  htmlUpdater (node, value, oldValue) {
    node.innerHTML = node.innerHTML.replace(oldValue, value)
  },
  modelUpdater (node, value, oldValue) {
    node.value = value
  },
  attrUpdater (node, value, oldValue, prop) {
    node[prop].value = value
  }
}

const compileUnit = {
  text (node, vm, exp) { // 对应v-text
    this.bind(node, vm, exp, 'text')
  },
  html (node, vm, exp) { // 对应v-html
    this.bind(node, vm, exp, 'html')
  },
  model (node, vm, exp) { // 对应v-model(双向绑定)
    this.bind(node, vm, exp, 'model')
    let val = this._getVMVal(vm, exp)
    const inputHandler = e => {
      const newValue = e.target.value
      if (newValue === val) return
      this._setVMVal(vm, exp, newValue)
      val = newValue
    }
    node.addEventListener('input', inputHandler, false)
  },

  bind (node, vm, exp, dir) {
    const updateFn = updater[dir + 'Updater']
    const initValue = dir === 'text' ? '{{' + exp + '}}' : ''
    updateFn && updateFn(node, this._getVMVal(vm, exp), initValue)
    new Watcher(vm, exp, function (value, oldValue) {
      updateFn && updateFn(node, value, oldValue)
    })
  },
  eventHandler (node, vm, exp, dir) {
    const eventType = dir.slice(dir.indexOf('@') === 0 ? 1 : 5)
    const fn = vm.$options.methods && vm.$options.methods[exp]
    if (eventType && fn) {
      node.addEventListener(eventType, () => fn.call(vm), false)
    }
  },
  _getVMVal (vm, exp) {
    let val = vm._data
    const segments = exp.split('.')
    segments.forEach(key => {
      val = val[key]
    })
    return val
  },
  _setVMVal (vm, exp, value) {
    let val = vm._data
    const segments = exp.split('.')
    const len = segments.length

    segments.forEach((key, idx) => {
      if (idx < len - 1) val = val[key]
      else val[key] = value
    })
  }
}

export default Compile
