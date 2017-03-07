import Observer from './Observer'

let app3 = new Observer({
  user: {
    name: {
      firstName: 'shaofeng',
      lastName: 'liang'
    },
    age: 25
  }
})

app3.$watch('user', function (newName) {
  console.log('这是加在user上的事件')
})
app3.$watch('user.name', function (newName) {
  console.log('这是加在user.name上的事件')
})
app3.$watch('user.name.firstName', function (newName) {
  console.log('这是加在user.name.firstName上的事件')
})

app3.data.user.name.firstName = 'hahaha'

// 你访问了user
// 这是加在user上的事件
// 你访问了user
// 你访问了name
// 这是加在user.name上的事件
// 你访问了user
// 你访问了name
// 你访问了firstName
// 这是加在user.name.firstName上的事件
// "hahaha"
