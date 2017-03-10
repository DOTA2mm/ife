const toNodeFragment = node => {
  const fragment = document.createDocumentFragment()
  let child
  while (child = node.firstChild) fragment.appendChild(child) // eslint-disable-line
  return fragment
}

const isElementNode = node => node.nodeType === 1 // 元素节点
const isTextNode = node => node.nodeType === 3 // 文本节点
const isDirective = attr => attr.nodeName.indexOf('v-') === 0

const _splice = Array.prototype.slice

class Compile {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = isElementNode(el) ? el : document.querySelector(el)
    if (this.$el) {
      this.$fragment = toNodeFragment(this.$el)
      this.compile(this.$fragment.childNodes)
      this.$el.appendChild(this.$fragment)
    }
  }

  compile (nodes) {
    nodes = _splice.call(nodes)
    nodes.forEach(node => {
      if (isElementNode(node)) {
        this.compileEl(node)
      } else if (isTextNode(node)) {
        const reg = /\{\{(.+?)}}/g
        let match = reg.exec(node.nodeValue) // ['{{user.name}}', 'user.name']
        if (match) {
          this.compileText(node, match[1], match.index, this.$vm)
        }
      }

      const childNodes = node.childNodes
      if (childNodes && childNodes.length) {
        this.compile(childNodes) // 递归遍历子节点
      }
    })
  }

  compileEl (node) {
    const attrs = _splice.call(node.attributes)
    attrs.forEach(attr => { // TODO: 指令解析
      // console.log(attr) // attr: 属性节点**对象**
      if (isDirective(attr)) console.log(attr)
    })
  }

  compileText (node, exp, index, vm) {
    updater.textUpdater(node, this._getVMVal(vm, exp), '{{' + exp + '}}', index)
  }
  // 取键路径对应的值
  _getVMVal (vm, exp) {
    let val = vm._data
    exp = exp.split('.')
    exp.forEach(k => {
      val = val[k]
    })
    return val
  }
}

const updater = {
  textUpdater: (node, value, oldValue, startIndex) => {
    node.nodeValue = node.nodeValue.replace(oldValue, value)
  }
}

export default Compile
