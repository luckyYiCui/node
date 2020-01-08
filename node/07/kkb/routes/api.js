/*
 * @Author: your name
 * @Date: 2020-01-08 10:38:37
 * @LastEditTime : 2020-01-08 15:20:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \121231\node\07\kkb\routes\app.js
 */
const Router = require('koa-router');
const router = new Router({ prefix: '/api' });
const captcha = require('trek-captcha');

router.get('/captcha', async ctx => {
    console.log('ctx.session.captcha', ctx.session.captcha)
    const { token, buffer } = await captcha({ size: 4 });
    console.log('token:', token)
    ctx.session.captcha = token
    ctx.body = buffer;
})

const qs = require('querystring');
const md5 = require('md5');
const moment = require('moment')
const axios = require('axios');

router.get('/sm', async ctx => {
    const to = ctx.query.to; // 目标手机号码
    let code = (Math.random() * 999999).toFixed();
    const accountSid = "3324eab4c1cd456e8cc7246176def24f"; // 账号id
    const authToken = "b1c4983e2d8e45b9806aeb0a634d79b1"; // 令牌
    const templateid = "613227680"; // 短信内容模板id
    const param = `${code},1`; // 短信参数
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const sig = md5(accountSid + authToken + timestamp); // 签名
    // http://www.miaodiyun.com/developer.html#smsSend
    try {
        // 发送post请求
        const resp = await axios.post('https://openapi.miaodiyun.com/distributor/sendSM',
            qs.stringify(accountSid, to, templateid, param, timestamp, sig), { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        if (resp.data.respCode === '00000') {
            const expires = moment().add(1, "minutes")
                .toDate();
            ctx.session.smsCode = { to, code, expires };
            ctx.body = { ok: 1 };
        } else {
            ctx.body = { ok: 0, message: resp.data.respDesc }
        }
    } catch (err) {
        ctx.body = { ok: 0, message: err.message }
    }

})

module.exports = router;