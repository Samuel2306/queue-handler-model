function beforeFunc(elem){
  if(!utils.isFunction(elem)){
    return false
  }
}

// 操作数组的工具类
function ArrayTool(arr){
  this.arr = arr || []
}



ArrayTool.prototype = {
  constructor: ArrayTool,
  pushToArray: function(elem){
    return this.arr.push(elem)
  },
  unshiftToArray: function(elem){
    return this.arr.unshift(elem)
  },
  popFromArray: function(){
    return this.arr.pop()
  },
  shiftFromArray: function(){
    return this.arr.shift()
  },
  spliceFromArray: function(elem,index){
    if(typeof elem != 'function'){
      index = elem
      elem = null
    }
    return elem ? this.arr.splice(index,0,elem) : this.arr.splice(index,1)
  },
  attach: function(arr){
    this.arr = Array.isArray(arr) ? arr : [arr]
  }
}

/*var funcList = ['pushToArray','unshiftToArray','popFromArray','shiftFromArray']
for (var i = 0; i < funcList.length; i++) {
  ArrayTool.prototype[funcList[i]] = ArrayTool.prototype[funcList[i]].before(beforeFunc,{
    isNotValidateFunc: false
  })
}*/


