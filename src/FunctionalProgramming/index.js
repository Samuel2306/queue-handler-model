/**
 * 函数式编程的compose概念具体实现: 闭包和递归
 */

function Compose(fns) {
  if(fns && !Array.isArray(fns)){
    fns = [fns]
  }
  this.fns = fns || []
  this.length = this.fns.length
  this.arrayTool = new ArrayTool(this.fns)
}

Compose.prototype = {
  constructor: Compose,
  // 必须调用init获取执行队列的引用
  init: function(){
    var result = null
    var self = this
    return function next(){
      var args = utils.formatArgs(arguments)
      Compose.count = Compose.count < 0 ? 0 : Compose.count
      result = this.fns[Compose.count].apply(null, args);
      if (Compose.count >= self.length - 1) { // 队列执行完了，直接返回结果
        Compose.count = -1
        return result
      } else {
        Compose.count++;
        // 递归调用
        return next(result);
      }
    }
  },
  pushToArray: function(elem){
    this.arrayTool.pushToArray(elem)
    this.length = this.fns.length
  },
  popFromArray: function(){
    this.arrayTool.popFromArray()
    if(Compose.count >= 0){
      Compose.count += 1
    }
    this.length = this.fns.length
  },
  unshiftToArray: function(elem){
    this.arrayTool.unshiftToArray(elem)
    this.length = this.fns.length
  },
  shiftFromArray: function(){
    this.arrayTool.shiftFromArray()
    if(Compose.count >= 0){
      Compose.count -= 1
    }
    this.length = this.fns.length
  },
  addToNext(elem){
    this.arrayTool.spliceFromArray(elem, Compose.count + 1)
    this.length = this.fns.length
  },
  addToQueue(elem,index){
    if(index >= Compose.count){
      this.arrayTool.spliceFromArray(elem, index)
    }else{
      this.arrayTool.spliceFromArray(elem, index)
      Compose.count += 1
    }
    this.length = this.fns.length
  },
  deleteNext(){
    this.arrayTool.spliceFromArray(Compose.count + 1)
    this.length = this.fns.length
  },
  deleteFromQueue(index){
    if(index >= Compose.count){
      this.arrayTool.spliceFromArray(index)
    }else{
      this.arrayTool.spliceFromArray(index)
      Compose.count -= 1
    }
    this.length = this.fns.length
  }
}


// 当前执行函数的索引
Compose.count = -1


