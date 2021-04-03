## Carousel

轮播组件

### 功能点
1. 图片从左到右循环出现
2. 带左右箭头控制器，点击切换上一张/下一张图片
3. 底下有圆点指示器，鼠标移动到圆点上即切换到对应位置的图片

### config
#### autoplay
    number|undefined，自动播放时长，以毫秒为单位。

### property
#### activeIndex
    number, 当前轮播的第几张图，从0开始计数。

### methods
#### goto(index: number): void
    跳到index张图

#### next():void
    下一张图

#### prev():void
    上一张图

### events

#### onClick
    点击轮播图

#### hover
    悬停轮播图

### lifecycles
#### render
    渲染当前组件

#### beforeComponentMount
    组件挂载到dom前
#### componentDidMount
    组件挂载在dom

### 插件

#### 左右按钮控制器

#### 圆点指示器

### Component类
#### interface Plugin
 - render(component): string
 - action(component): void
#### installPlugin(plugin: Plugin)
    插件依赖注入
#### callHook(hook: string, ...payload: Array<any>)
    触发组件和插件上到钩子函数

#### mount(el: element)
    将render返回的HTML片段挂载到el上。