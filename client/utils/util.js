
/**
 * =>箭头函数
 * ES6标准新增了一种新的函数，Arrow Function箭头函数
 * x=>x*x
 * 当箭头函数有一个参数时，参数两边的括号是可有可无的，但是还是有括号看起来清楚
 * const foo=bar=>bar+1
 * const foo=(bar)=>bar+1
 * 
 * 等同于
 * function(x){
 *   return x*x
 * }
 * 箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连{...}和return都省掉了。还有一种可以包含多条语句，这时候就不能省略
 * {...}和return了。
 * x=>{
 *  if(x>0){
 *    return x*x;
 *  }else{
 *    return -x*x;
 *  }
 * }
 * 
 * 如果参数不是一个，就需要用括号()括起来
 * (x,y)=>x+y
 * 
 * 无参，不带参数时也需要用括号
 * ()=>3.14
 * 
 * 可变参数
 * (x,y,...rest)=>{
 *    var i,sum=x+7;
 *    for(i=0;i<rest.length;i++){
 *      sum+=reset[i]
 *  }
 *  return sum;
 * }
 * 
 * const要有返回值
 * var没有返回值
 * 
 * 如果要返回一个对象，就要注意了，如果是但表达式，这么写会报错 x=>{foo:x},所以要改为 x=({foo:x})
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

module.exports = { formatTime, showBusy, showSuccess, showModel }
