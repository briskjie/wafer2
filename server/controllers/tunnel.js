
/**
 * es6语法糖
 * 
 * var {a} = {a:1,b:2}
 * 等价于
 * var obj={a:1,b:2}
 * var a=obj.a
 * 
 * 对象字面量
 * 对象的字面量是以{}形式直接表示对象，比如下面这样：
 * var book={
 *  title:"cxx",
 *  age:19
 * }
 * 
 * ES6位对象的字面量、
 * 
 * 
 * 简写箭头函数带来的一些问题：
 * 当你的简写箭头函数返回值为一个对象时，你需要用小括号括起来你想返回的对象。否则，浏览器会把对象的{}解析为箭头函数函数体的开始和结束标志
 * var objectFactory=()=>({modular:'es6'})
 * 
 * 
 * 
 * 对象解构
 * 为了更好的描述对象解构如何使用，我们先构建下面这样一个对象
 * var charactor={
 *  name:'cxx',
 *  psedonym:'sds'
 *  metadata:{
 *    age:22
 *  },
 *  batarange:['s','d','w']
 * }
 * 现在结社有一个名为psedonym的变量，我们想让其变量值指向charactor.psedonym，使用es5，往往会这样做：
 *  var psedonym=charator.psedonym
 * 
 * es5致力于让我们的代码更加简洁，通过es6我们可以用下面的代码实现一样的功能：
 * 
 * var { psedonym}= charactor
 * var {name,psedonym}=charactor
 * 
 * 我们还可以混用结构和常规的自定义变量，这也是解构语法灵活的表现之一：
 * 
 * var {name}=charactor,two=3
 * 
 * 解构还允许我们使用别名，比如我们想把charactor.psedonym赋值给变量alias,可以按下面的语句这样做，只需要在psedonym后面加上:即可
 * 
 * var {pseduonym:alias}=charactor
 * 
 * 结构还有另一个强大的功能，解构值还可以是对象
 * 把charactor对象里面的metadata的gender赋值给左边对象的metadata的gender
 * var {metadata:{gender}}=charactor
 * 
 * 当然对于多层解构，我们同样可以赋予别名，这样我们就可以通过非常简洁的方法修改子属性的名称
 * 
 * var {metadata:{gender:charactorGender}}=charactor
 * 
 * 解构时当左边声明了一个右边对象中不存在的属性，会得到undefined
 * 
 * 解构就是一种语法糖
 * 解构也可添加默认值，如果右侧不存在对应的值，默认值就会生效，添加的默认值可以是数值，字符串，函数，对象，可以是某一个已经存在的值
 * 
 * var {boots={size:10}}=charactor
 * 
 * charactor里面没有boots属性，就使用默认的 boots={size:10}
 * 
 * 默认值和别名也可以一起使用，不过需要注意的是别名要放在前面，默认值添加给别名
 * 
 * var {boots: footwear ={size:10}}=charactor
 * 
 * footwear是别名，{size:10}是默认值
 * 
 * 
 * 对象解构同样支持计算属性名，但是这时候必须要添加别名，这是因为计算属性名允许任何类似的表达式，不添加别名，浏览器解析时会有问题。
 * 
 * var {['boo'+'ts']:charactorBoots}=charactor
 * 还是那句话，我们不是在任何情况下都应该使用解构，语句charactorBoots=charactor[type] 看起来比{[type]:charactorBoots}=charactor更加清晰，但是当你需要提取对象中的子对象时，解构就很简洁
 * 方便了
 * 
 * 
 * 在数组中如何使用解构？
 * 数组解构的语法和对象解构的语法蕾西，区别在于，数组解构我们使用中括号而非花括号，下面代码中，通过结构，我们再数组coordinates中提出了变量x,y,你不需要使用x=coordinates[0]这样语法了，
 * 数组解构不适用索引值，但是却让代码更加清晰。
 * 
 * var  coordinates=[12,3]
 * var [x,y]=coordinates
 * console.log(x)
 * //<-12
 * 
 * 数组解构允许你跳过不想用的值，在对应地方留白即可：
 * var names=['a','s','c']
 * var [f,,s]=names
 * 
 * 和对象解构一样，数组解构也允许你添加默认值
 * 
 * var names=['s','t']
 * var [f='s',,l='ss']=names
 * 
 * 
 * 在ES6中，你需要借助三个变量，才能完成两个变量的值得交换（采用中间变量）
 * 而使用解构，一切就简单多了
 * var left=5,right=7
 * [left,right]=[right,left]
 * 
 *
 * 
 * 
 */

const { tunnel } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')

/**
 * 这里实现一个简单的聊天室
 * userMap 为 tunnelId 和 用户信息的映射
 * 实际使用请使用数据库存储
 */
const userMap = {}

// 保存 当前已连接的 WebSocket 信道ID列表
const connectedTunnelIds = []

/**
 * 调用 tunnel.broadcast() 进行广播
 * @param  {String} type    消息类型
 * @param  {String} content 消息内容
 */
const $broadcast = (type, content) => {
    tunnel.broadcast(connectedTunnelIds, type, content)
        .then(result => {
            const invalidTunnelIds = result.data && result.data.invalidTunnelIds || []

            if (invalidTunnelIds.length) {
                console.log('检测到无效的信道 IDs =>', invalidTunnelIds)

                // 从 userMap 和 connectedTunnelIds 中将无效的信道记录移除
                invalidTunnelIds.forEach(tunnelId => {
                    delete userMap[tunnelId]

                    const index = connectedTunnelIds.indexOf(tunnelId)
                    if (~index) {
                        connectedTunnelIds.splice(index, 1)
                    }
                })
            }
        })
}

/**
 * 调用 TunnelService.closeTunnel() 关闭信道
 * @param  {String} tunnelId 信道ID
 */
const $close = (tunnelId) => {
    tunnel.closeTunnel(tunnelId)
}

/**
 * 实现 onConnect 方法
 * 在客户端成功连接 WebSocket 信道服务之后会调用该方法，
 * 此时通知所有其它在线的用户当前总人数以及刚加入的用户是谁
 */
function onConnect (tunnelId) {
    console.log(`[onConnect] =>`, { tunnelId })

    if (tunnelId in userMap) {
        connectedTunnelIds.push(tunnelId)

        $broadcast('people', {
            'total': connectedTunnelIds.length,
            'enter': userMap[tunnelId]
        })
    } else {
        console.log(`Unknown tunnelId(${tunnelId}) was connectd, close it`)
        $close(tunnelId)
    }
}

/**
 * 实现 onMessage 方法
 * 客户端推送消息到 WebSocket 信道服务器上后，会调用该方法，此时可以处理信道的消息。
 * 在本示例，我们处理 `speak` 类型的消息，该消息表示有用户发言。
 * 我们把这个发言的信息广播到所有在线的 WebSocket 信道上
 */
function onMessage (tunnelId, type, content) {
    console.log(`[onMessage] =>`, { tunnelId, type, content })

    switch (type) {
        case 'speak':
            if (tunnelId in userMap) {
                $broadcast('speak', {
                    'who': userMap[tunnelId],
                    'word': content.word
                })
            } else {
                $close(tunnelId)
            }
            break

        default:
            break
    }
}

/**
 * 实现 onClose 方法
 * 客户端关闭 WebSocket 信道或者被信道服务器判断为已断开后，
 * 会调用该方法，此时可以进行清理及通知操作
 */
function onClose (tunnelId) {
    console.log(`[onClose] =>`, { tunnelId })

    if (!(tunnelId in userMap)) {
        console.log(`[onClose][Invalid TunnelId]=>`, tunnelId)
        $close(tunnelId)
        return
    }

    const leaveUser = userMap[tunnelId]
    delete userMap[tunnelId]

    const index = connectedTunnelIds.indexOf(tunnelId)
    if (~index) {
        connectedTunnelIds.splice(index, 1)
    }

    // 聊天室没有人了（即无信道ID）不再需要广播消息
    if (connectedTunnelIds.length > 0) {
        $broadcast('people', {
            'total': connectedTunnelIds.length,
            'leave': leaveUser
        })
    }
}

module.exports = {
    // 小程序请求 websocket 地址
    get: async ctx => {
        const data = await tunnel.getTunnelUrl(ctx.req)
        const tunnelInfo = data.tunnel

        userMap[tunnelInfo.tunnelId] = data.userinfo

        ctx.state.data = tunnelInfo
    },

    // 信道将信息传输过来的时候
    post: async ctx => {
        const packet = await tunnel.onTunnelMessage(ctx.request.body)

        debug('Tunnel recive a package: %o', packet)

        switch (packet.type) {
            case 'connect':
                onConnect(packet.tunnelId)
                break
            case 'message':
                onMessage(packet.tunnelId, packet.content.messageType, packet.content.messageContent)
                break
            case 'close':
                onClose(packet.tunnelId)
                break
        }
    }

}
