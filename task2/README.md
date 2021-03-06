### 任务二 - 任务动态数据绑定（一）
> [任务链接](http://ife.baidu.com/course/detail/id/15)  
[源码仓库](https://github.com/DOTA2mm/ife/tree/master/task2)  

本任务主要模拟了`vue.js`中双向数据绑定的核心基础`observ`观察器。
双向绑定中最基本的就是要知道数据模型中的哪个成员发生了改变，本例中的实现则是该功能的雏形。  

#### 要点
`ES5`中新增了`Object.defineProperty(obj, prop, descriptor)`方法来定义对象的数据属性和访问器属性。  
本例中使用的是访问器属性，即在对属性读取或赋值操作时，都会触发相应的`getter`和`setter`，从而起到了监控对象属性变化的目的。  
将`walk`函数放到构造器中，使每构造一个`Observer`的实例都会去调用
`walk()`，`walk`则负责将传入构造器的对象属性变成访问器属性用以监控其变化。并且利用递归处理深层次的嵌套对象，保证每个成员都能被监控到。  
#### 总结
以前总是在各社区谈到这种双向绑定的原理，大概的实现思路有基本掌握，但是从没有动手敲过一遍实现一遍。  
这个任务虽然比较小，但是确实最基础很好的回顾。任务中的`Observer`实现是绝大多数`MVVM`框架实现动态数据绑定的基本原理。  
本例完全使用了`ES6`语法，让代码更简洁易懂，用`Babel`编译成`ES5`实现兼容。  
本来想拆分下相应代码，熟悉下`webpack`，结果意外造成“循环加载”。。

#### 参考资料
- [vue早期源码学习系列之一：如何监听一个对象的变化](https://github.com/youngwind/blog/issues/84)
- [vue 源码分析之如何实现 observer 和 watcher](https://segmentfault.com/a/1190000004384515)