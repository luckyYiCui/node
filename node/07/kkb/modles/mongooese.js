/*
 * @Author: your name
 * @Date: 2020-01-02 16:47:27
 * @LastEditTime : 2020-01-03 10:21:01
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \121231\node\05\modles\mongooese.js
 */
const mongoose = require('mongoose');

// 1.连接
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

const conn = mongoose.connection;
conn.on("error", () => console.error("连接数据库失败"));
conn.once("open", () => console.log("连接数据库成功"));