
const { mysql } = require('../qcloud')


module.exports = async ctx => {
  // 获取上传之后的结果
  // 具体可以查看：
  var book = {
    id: 1,
    name: "冰与火之歌",
    price: 88
  }
  
  await mysql("Book").insert(book)
  var res = await mysql("Book").where({ id }).first()

  // ctx.state.data = {
  //   msg: '测试 CGIsfds'
  // }
  ctx.state.data = res
}


/**
 * ctx:是context（上下文）的缩写，它是web框架，专注HTTP生命周期即同意请求到响应结束，CTX指的是HTTP生命周期的上下文
 * 
 * koa提供一个Context对象，表示一次对话的上下文（包括HTTP请求和HTTP回复）通过加工这个对象，就可以控制返回给用户的内容
 */