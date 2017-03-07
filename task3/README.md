### 任务三 - 任务动态数据绑定（二）
> [任务链接](http://ife.baidu.com/course/detail/id/20)  
[源码仓库](https://github.com/DOTA2mm/ife/tree/master/task3)  

#### 总结
任务三在任务二的基础上增加了：
1. 新设置的对象的属性能继续响应 `getter` 和 `setter`
2. 实现了`$watch`来监听属性的变化并添加对应回调事件
对于1，直接在`setter`里进行判断，如果新值是对象，则将新对象传入构造器继续设置器构造器属性。  
而2是利用观察者模式实现一个自定义事件，调用`$watch`来订阅事件，修改了属性值则在`setter`中触发事件。

#### 参考资料
- [《JavaScript高级程序设计》学习-22.4-自定义事件](http://pages.fedt.xin/2016/08/17/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/)
- [动态数据绑定之监听对象变化](http://ife.baidu.com/note/detail/id/302)