/*
 * @Author: your name
 * @Date: 2020-01-06 09:49:30
 * @LastEditTime : 2020-01-08 14:28:46
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \121231\node\06\kkb\routes\users.js
 */
const Router = require("koa-router");
const router = new Router({ prefix: '/users' });
// router.get("/", async ctx => {
//     console.log('user')
//         // ctx.body = "users list";
//     await ctx.render("users", {
//         title: "用户列表",
//         subTitle: "handlebars语法",
//         isShow: true,
//         username: "jerry",
//         htmlStr: `<h3>abc</h3>`,
//         users: [
//             { username: "tom", age: 20, birth: new Date(1999, 2, 2) },
//             { username: "jerry", age: 20, birth: new Date(1999, 3, 2) }
//         ]
//     });
// });
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

// koa 表单验证
const bouncer = require('koa-bouncer'); // 中间件引入
const isUser = name => Promise.resolve(name == 'abcabc');
const val = async(ctx, next) => {
    try {
        ctx.validateBody('name')
            .required('要求提供用户名')
            .isString()
            .trim()
            .isLength(6, 100, '要求提供用户名必须 6-100')
            // .check(await isUser(ctx.vals.name), 'Check ok'); // 自定义验证方法，验证失败，返回 'check ok’
        console.log(JSON.stringify(ctx.vals));
        next()
    } catch (err) {
        if (err instanceof bouncer.ValidationError) {
            ctx.body = '校验失败：' + err.message;
            return
        }
        throw err;
    }
}

// restful api
const users = [{ id: 1, name: "tom" }, { id: 2, name: "jerry" }];
router.get('/', (ctx) => {
    console.log("GET /users", ctx.body);
    const { name } = ctx.query;
    const data = users;
    if (name) {
        data = users.filter(u => u === name);
    }
    ctx.body = { ok: 1, data };
})

router.post('/', val, ctx => {
    console.log("POST /users");
    //const user = ctx.request.body.user;
    const { body: user } = ctx.request; // 请求body 
    console.log(ctx.request.body)
    console.log('user', user)
    user.id = users.length + 1;
    users.push(user);
    ctx.body = { ok: 1 };
})

router.delete('/:id', ctx => {
    const { id } = ctx.params;
    console.log('id', id);
    const idx = users.findIndex(v => v.id == id);
    console.log('idx', idx);
    if (idx > -1) {
        users.splice(idx, 1);
    }
    ctx.body = { ok: 1 };
})

router.put('/', ctx => {
    console.log("PUT /users");
    const { body: user } = ctx.request; // 请求body 
    const idx = users.findIndex(u => u.id == user.id);
    if (idx > -1) {
        users[idx] = user;
    }
    ctx.body = { ok: 1 };
})

/* 参数获取
   post: ctx.request
   put: ctx.request
   delete:  ctx.params
   get: ctx.query
 */

// 文件上传
const upload = require("koa-multer")({ dest: "./public/images" }); // 上传的图片放置images中
router.post('/upload', upload.single("file"), ctx => {
    console.log(ctx.request.file);
    console.log(ctx.request.body);
    ctx.body = "上传成功";
})
module.exports = router;