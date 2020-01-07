/*
 * @Author: your name
 * @Date: 2020-01-06 09:49:30
 * @LastEditTime : 2020-01-06 16:03:36
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \121231\node\06\kkb\routes\users.js
 */
const Router = require("koa-router");
const router = new Router({ prefix: '/users' });
router.get("/", async ctx => {
    console.log('user')
        // ctx.body = "users list";
    await ctx.render("users", {
        title: "用户列表",
        subTitle: "handlebars语法",
        isShow: true,
        username: "jerry",
        htmlStr: `<h3>abc</h3>`,
        users: [
            { username: "tom", age: 20, birth: new Date(1999, 2, 2) },
            { username: "jerry", age: 20, birth: new Date(1999, 3, 2) }
        ]
    });
});
router.post('/login', async ctx => {
    // 鉴权可向数据库查询该用户，此步骤忽略
    const { body } = ctx.request;
    console.log('body', body);
    // 登录逻辑， 直接成功

    ctx.session.userinfo = body.username

    ctx.body = {
        ok: 1,
        message: '登录成功'
    }
})

router.post('/logout', async ctx => {
    // 退出登录
    delete ctx.session.userinfo;
    ctx.body = {
        ok: 2,
        message: '退出成功'
    }
})

router.get("/getUser", require("../middleware/outh.js"), async ctx => {
    ctx.body = {
        ok: 1,
        message: "获取数据成功",
        userinfo: ctx.session.userinfo
    };
});

// token jsonwebtoken
const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');
const secret = "its secret"; //秘诀

router.post('/login-token', async ctx => {
    const { body } = ctx.request;
    const userinfo = body.userinfo;
    ctx.body = {
        message: '登录成功',
        user: userinfo,
        token: jwt.sign({
            data: userinfo,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }, secret)
    }
})

router.get("/getUser-token", jwtAuth({ secret }), async ctx => {
    let token = ctx.header.authorization

    ctx.body = {
        token: token,
        user: ctx.state.user
    }

    //使用jwt-simple自行解析数据
    let payload = jwt.decode(token.split(' ')[1], secret);
    console.log(payload)
});

module.exports = router;