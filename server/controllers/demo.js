module.exports = ctx => {
    ctx.state.data = {
        msg: '测试 CGIsfds'
    }
}
//CGI


/**
 * ctx:是context（上下文）的缩写，它是web框架，专注HTTP生命周期即同意请求到响应结束，CTX指的是HTTP生命周期的上下文
 * 
 * koa提供一个Context对象，表示一次对话的上下文（包括HTTP请求和HTTP回复）通过加工这个对象，就可以控制返回给用户的内容
 */