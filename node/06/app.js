/*
 * @Author: your name
 * @Date: 2020-01-03 16:20:18
 * @LastEditTime : 2020-01-06 11:04:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \121231\node\06\app.js
 */
const session = require('koa-session');
const koa = require('koa');
const app = new koa();


app.keys = ['some secret']; // 签名关系，不可泄露

const SESS_CONFIG = {
    key: 'kkb:sess', // cookie key (default is koa:sess)
    maxAge: 8640000, // cookie的过期时间 maxAge in ms (default is 1 days)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true //签名默认true
}

app.use(session(SESS_CONFIG, app));

app.use(async(ctx, next) => {
    if (ctx.path === '/favicon.ico') return
    const n = ctx.session.count || 0;
    console.log(n)

    ctx.session.count++;
    ctx.body = '访问' + n + '次.';
});
app.listen(8000);