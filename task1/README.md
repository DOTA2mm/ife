### 任务一  有趣的鼠标悬浮模糊效果
> [任务链接](http://ife.baidu.com/course/detail/id/14)  
[源码仓库](https://github.com/DOTA2mm/ife/tree/master/task1)  
[在线演示](http://fedt.xin/ife/task1/)

### 总结
#### 1. 工程化
这个任务其实只需要一个`html`文件就可以搞定，如果对`css3`相关知识熟练的话，马上完事。
但是我长期没用`CSS3`知识，做的过程中可能需要反复修改，边改代码边看效果。所以我决定用`gulp`作为构建工具帮我完成
编译`less`、自动刷新浏览器、压缩这一系列任务。  
使用`browser-sync`模块来执行自动刷新浏览器，对于这个项目非常方便实用。

#### 2. 页面布局
> 内容来自阮老师的：[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)，感谢阮老师的总结分享。  
同样，借这个项目我回顾了下`flex`布局。知识如果不用很容易忘掉，将`flex`布局相关的概念用法整理下加深记忆。  
与`flex`布局相关的一些概念如主轴(`main axis`)、交叉轴(`cross axis`)、主轴的开始位置（与边框的交叉点）(`main start`)、结束位置(`main end`)、
交叉轴的开始位置(`cross star`t)、结束位置(`cross end`)、
单个项目占据的主轴空间(`main size`)，占据的交叉轴空间(`cross size`)。
相关概念见[阮老师博客](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)里的这幅图：
![flex概念图](./images/flex.png)
- 容器的6个属性
```css
.container {
  display: flex; /* 首先指定该容器使用flex布局 */
  flex-direction: row | row-reverse | column | column-reverse; /* 主轴的方向（即项目的排列方向） */
  flex-wrap: nowrap | wrap | wrap-reverse; /* 如果一条轴线排不下如何换行 */
  flex-flow: <flex-direction> || <flex-wrap>; /* 以上的简写形式 */
  justify-content: flex-start | flex-end | center | space-between | space-around; /* 项目在主轴的对齐方式 */
  align-items: flex-start | flex-end | center | baseline | stretch; /* 项目在交叉轴上的对齐方式 */
  align-content: flex-start | flex-end | center | space-between | space-around | stretch; /* 定义多根轴线的对齐方式(如果项目只有一根轴线，该属性不起作用) */
}
```
- 项目的6个属性
```css
.item {
  order: <integer>; /* 项目的排列顺序。数值越小，排列越靠前，默认为0 */
  flex-grow: <number>; /* 项目的放大比例，默认为0，即如果存在剩余空间，也不放大 */
  flex-shrink: <number>; /* 项目的缩小比例，默认为1，即如果空间不足，该项目将缩小 */
  flex-basis: <length> | auto; /* 分配多余空间之前，项目占据的主轴空间（可以设为跟width或height属性一样的值，（%， px）） */
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]; /* 简写属性 */
  align-self: auto | flex-start | flex-end | center | baseline | stretch; /* 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性 */
}
```
`flex`布局只要搞清楚了以上这些概念和用法并正确使用，用多了就会越用越灵活越熟练。

#### 3. CSS3伪元素和渐变
`translate`和`transform`是`CSS3`中的利器，可以做出很炫酷的效果，这个项目中多有体现。  
- 伪元素
以前做边框的过渡效果，总是使用一个空的标签如`span`再用它的伪元素（内容生成）做模拟边框，
做这个项目的时候看到一位同学用的方法很不错：  
利用容器生成与容器等宽/高的伪元素，设置伪元素边框的过渡效果。这样的边框是真正的`border`而且没有加无用标签。
我的实现中借鉴了这个做法。

- 渐变
`css3`的渐变也很久没用了，差不多忘干净。。
渐变的定义方法有必要温习下：`background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);`  
任务中的文字流光效果用渐变动画来实现：  
现将背景水平方向拉伸一倍：`background-size: 200% 100%`；  
再在动画里设置：`background-position`（负值才是往右移动）；  
最后`background-clip: text`用文字剪(?像ps中的蒙版)背景；  
  > 参考链接：[小tip: CSS3与文字渐变光影流动动画效果实现](http://www.zhangxinxu.com/wordpress/2014/02/css3%E4%B8%8E%E6%96%87%E5%AD%97%E6%B8%90%E5%8F%98%E6%B0%B4%E7%BA%B9%E6%B3%A2%E5%8A%A8%E6%95%88%E6%9E%9C/)