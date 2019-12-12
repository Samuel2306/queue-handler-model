本项目旨在提供一系列队列处理方案，包括同步队列和异步队列的处理方案。


#### 1、扩展Function原型链(src/ProtoExtend/index.js) - before/after

首先利用原型链扩展Function类，定义before和after方法：

> Function.prototype.before = function(beforeFunc,options){...}
> Function.prototype.after = function(afterFunc,options){...}

举个简单的例子：
`````` 
function beforeFunc(){
  console.log(1)
}

function myFunc(){
  console.log(2)
}

function afterFunc(){
  console.log(3)
}
myFunc = myFunc.before(beforeFunc)
myFunc = myFunc.after(afterFunc)
myFunc()  // 1,2,3
`````` 
以上这种方法的优点是使用简单，缺点是队列一旦形成，要动态修改队列就不是那么容易了。

  
#### 2、函数式编程的compose实现(src/FunctionalProgramming/index.js)

比如把greeting和toUpper组合成一个复合函数，然后调用这个复合函数，会先调用greeting，然后把返回值传给toUpper继续执行。

与此同时还实现了动态添加队列元素，删除队列元素，替换队列元素，清空队列等操作。
