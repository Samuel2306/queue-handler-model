/**
 * 为函数定义前置处理
 * @param beforeFunc：前置函数
 * @param options: 配置对象
 * @returns {function(): *}
 */
Function.prototype.before = function(beforeFunc,options){
  var oldFunc = this

  options = Object.assign({
    clearQueue: true, // 清除之前绑定的前值函数队列
    isNotValidateFunc: true // 当前beforeFunc是否是验证性函数
  }, options)
  // 将前置函数是不是验证性函数绑定到函数本身
  beforeFunc.isNotValidateFunc = options.isNotValidateFunc
  oldFunc.beforeFunc = beforeFunc

  // 逐层清除前置函数
  if(options.clearQueue){
    var p = oldFunc.innerFunc
    while(p){
      p.beforeFunc = null
      p = p.innerFunc
    }
  }


  var func = function(){
    var res
    var args = utils.formatArgs(arguments)
    if(oldFunc.beforeFunc){
      if(oldFunc.beforeFunc.isNotValidateFunc){
        // 将前置函数的结果一并传入到自证需要执行的函数
        res = oldFunc.beforeFunc.apply(null, res == undefined ? args : args.concat(Array.isArray(res) ? res : [res]))
      }else{
        var valid = oldFunc.beforeFunc.apply(null, res == undefined ? args : args.concat(Array.isArray(res) ? res : [res]))
        if(!valid) return false
      }
    }
    return oldFunc.apply(null, res == undefined ? args : args.concat([res]))
  }

  // 将内部函数引用放在innerFunc属性上面,方便清除队列
  func.innerFunc = oldFunc
  return func
}


/**
 * 为函数定义后置处理
 * @param afterFunc：前置函数
 * @param options: 配置对象
 * @returns {function(): *}
 */
Function.prototype.after = function(afterFunc,options){
  var oldFunc = this

  options = Object.assign({
    clearQueue: true, // 清除之前绑定的后置函数队列
    isNotValidateFunc: true // 当前beforeFunc是否是验证性函数
  }, options)
  // 将后置函数是不是验证性函数绑定到函数本身
  afterFunc.isNotValidateFunc = options.isNotValidateFunc
  oldFunc.afterFunc = afterFunc

  // 逐层清除后置函数
  if(options.clearQueue){
    var p = oldFunc.innerFunc
    while(p){
      p.afterFunc = null
      p = p.innerFunc
    }
  }


  var func = function(){
    var args = utils.formatArgs(arguments)
    var res = oldFunc.apply(null, args)

    if(oldFunc.afterFunc){
      // 将真正需要执行函数的结果一并传入到后置函数中
      if(oldFunc.afterFunc.isNotValidateFunc){
        res = oldFunc.afterFunc.apply(null, res == undefined ? args : (Array.isArray(res) ? res.concat(args) : [res].concat(args)))
      }else{
        var valid = oldFunc.afterFunc.apply(null, res == undefined ? args : (Array.isArray(res) ? res.concat(args) : [res].concat(args)))
        if(!valid) return false
      }
    }

    return res
  }

  // 将内部函数引用放在innerFunc属性上面,方便清除队列
  func.innerFunc = oldFunc
  return func
}
