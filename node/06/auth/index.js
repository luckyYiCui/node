/*
 * @Author: your name
 * @Date: 2020-01-06 16:13:03
 * @LastEditTime : 2020-01-07 09:13:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \121231\node\06\auth\index.js
 */
const koa = require('koa');
const router = require('koa-router')();
const static = require('koa-static');
const axios = require('axios');
const querystring = require('querystring');
const app = new koa();

app.use(static(__dirname + '/'));
const config = {
    client_id: '007218d74f6590bb6e4c',
    client_secret: '5fb5379e8588512f18bc07a3623cf2ebeee8b44d'
}

router.get('/github/login', async(ctx) => {
    var dataStr = (new Date()).valueOf();
    console.log('/github/login', ctx)
        //重定向到认证接口,并配置参数
    var path = "https://github.com/login/oauth/authorize";
    path += '?client_id=' + config.client_id;

    //转发到授权服务器
    ctx.redirect(path);
})
router.get('/github/callback', async(ctx) => {
    const code = ctx.query.code;
    console.log('callBack..', code)
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }
    console.log(params)
    let res = await axios.post('https://github.com/login/oauth/access_token', params)
    const access_token = querystring.parse(res.data).access_token
    res = await axios.get('https://api.github.com/user?access_token=' + access_token)
    console.log('userAccess:', res.data);
    ctx.body = `
    <h1>Hello ${res.data.login}</h1>
    <img src="${res.data.avatar_url}" alt=""/>`

})
app.use(router.routes());
app.use(router.allowedMethods()) //当客户端发送POST请求时，就会直接返回失败
app.listen(3000);