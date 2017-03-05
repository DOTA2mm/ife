/**
 * 测试用例
 */
import Observer from './Observer'

let app = new Observer({
  name: 'liujianhuan',
  age: 25,
  company: 'Qihoo 360',
  address: 'Chaoyang, Beijing'
})

app.$watch('age', function (oldVal, newVal) {
  console.log(`我的年龄变了，原来是: ${oldVal}岁，现在是：${newVal}岁了`) // 我的年龄变了，原来是: 25岁，现在是：26岁了
})

app.$watch('age', function (oldVal, newVal) {
  console.log(`我的年龄真的变了诶，竟然年轻了${oldVal - newVal}岁`) // 我的年龄真的变了诶，竟然年轻了-1岁
})

app.data.age = 26;