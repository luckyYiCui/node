/*
 * @Author: your name
 * @Date: 2020-01-09 14:52:00
 * @LastEditTime : 2020-01-09 16:31:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \121231\egg\egg-example\app\controller\home.js
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        //   ctx.body = { name: 'tom' };
        // getAll() 约定，不用引入。
        ctx.body = await ctx.service.user.getAll()
    }
}

module.exports = HomeController;