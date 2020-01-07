/*
 * @Author: your name
 * @Date: 2020-01-02 16:28:21
 * @LastEditTime : 2020-01-03 13:53:33
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \121231\node\05\routes\index.js
 */
const Router = require('koa-router');
const router = new Router();

require('../modles/mongooese.js');
const vip = require('../modles/vip.js');

router.get('/', async ctx => {
    let showVideo;
    if (ctx.cookies.get('isPlayed')) {
        showVideo = false;
    } else {
        ctx.cookies.set('isPlayed', true, { maxAge: 7 * 24 * 3600000 });
        showVideo = true;
    }
    ctx.state.vipCourses = await vip.find();
    const list = [...ctx.state.vipCourses];
    console.log(list)

    // list.sort((a, b) => (a.sort - b.sort));
    await ctx.render('index', { list, showVideo })

})

module.exports = router;