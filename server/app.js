/**
 * server端主入口
 * 使用Node.js平台下的web开发框架koa，创建koa实例并响应请求
 */

/**
 * node.js
 * requre()函数由三种引入方式
 * 1、相对路径之当前路径：./xxx/xxx.js或./xxx/xxx
 * 2、相对路劲之上级目录：../xxx/xxx.js或../xxx/xxx
 * 3、绝对路径：F://xxx/xxx.js或/xxx/xxx.js或/xxx/xxx
 * 
 * requre(路径.扩展名)
 * 如果路径.扩展名存在，执行加载，否则抛出异常
 */
const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')//引入同级目录下的config.js,这样就可以使用其中的变量了

// 使用响应处理中间件
app.use(response)//加载response

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))


/**
 * doc
 * Koa框架简介
 * 
 * koa 基于Node.js平台的下一代web开发框架
 * koa是由Express原班人马打造的，致力于成为一个更小，更富有表现力，更健壮的web框架。使用koa编写web应用，通过组合不同的generator，可以
 * 免除重复繁琐的回调函数嵌套，并极大提升错误处理的效率。koa不在内核方法中绑定任何中间件，它仅仅提供了一种轻量优雅的函数库，使编写web应
 * 变得得心应手。
 * 
 * Koa应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。Koa类似你可能遇到的许多其他中间件系统，例如，ruby的Rack，connect等，然而，一个关键的设计点是在其中间件层中提供
 * 高级语法糖，这提高了互操作，稳健性，并使书写中间件更加愉快。
 * 这包括诸如内容协商，缓存清理，代理支持和重定向等常见任务方法。尽管提供了相当多的有用方法，koa仍保持了一个很小的体积，因为没有捆绑中间件。
 */