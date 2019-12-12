var utils = {
  isFunction: function(f){
    return typeof f == 'function'
  },
  formatArgs: function(args){
    var arr = []
    for (var i = 0; i < args.length; i++) {
      arr.push(args[i])
    }
    return arr
  }
}
