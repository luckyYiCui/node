/*
 * @Author: your name
 * @Date: 2020-01-02 11:24:16
 * @LastEditTime: 2020-01-02 11:32:48
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \新建文件夹\nodes\源码&笔记\node05\utils\helpers.js
 */
const hbs = require("koa-hbs");
const moment = require("moment");

hbs.registerHelper("date", (date, pattern) => {
    try {
        return moment(date).format(pattern);
    } catch (error) {
        return "";
    }
});