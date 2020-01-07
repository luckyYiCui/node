/*
 * @Author: your name
 * @Date: 2020-01-06 11:50:56
 * @LastEditTime : 2020-01-06 14:01:23
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \121231\node\06\kkb\middleware\outh.js
 */
// 用户拦截
module.exports = async ctx => {
    if (!ctx.session.userinfo) {
        ctx.body = {
            ok: '1',
            message: '用户未登录'
        }
    } else {
        await next();
    }
}