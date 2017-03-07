### 任务四 - 任务动态数据绑定（三）
> [任务链接](http://ife.baidu.com/course/detail/id/21)  
[源码仓库](https://github.com/DOTA2mm/ife/tree/master/task4)  

#### 总结
> path变量记录每一个属性值对于在data里的路径，当某一个属性改变时，他的路径会被解析为一个数组，数组中包含了每一个该属性的父级属性的路径，所以每一个父级属性都得到通知以启用回调。  
基本照抄下面的链接作者

#### 参考资料
- [Vue.js源码中对于deep watching的巧妙实现](http://ife.baidu.com/note/detail/id/358)