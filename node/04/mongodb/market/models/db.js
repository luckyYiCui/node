/*
 * @Author: your name
 * @Date: 2019-12-27 15:44:56
 * @LastEditTime : 2019-12-27 17:06:41
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\04\mongodb\market\models\db.js
 */
const conf = require('./conf.js');
const MongoClient = require("mongodb").MongoClient;
const EventEmitter = require('events').EventEmitter;

class Mongodb {
    constructor(conf) {
        this.conf = conf;
        this.emmiter = new EventEmitter();

        this.client = new MongoClient(conf.url, {
            // 防止新老版本出现问题
            useNewUrlParser: true
        });
        this.client.connect(err => {
            if (err) throw err;
            // 连接成功，派发事件
            console.log("连接成功");
            this.emmiter.emit('connect');
        });
    }

    // 添加表
    col(colName, dbName = conf.dbName) {
        return this.client.db(colName).collection('fruits');
    }

    once(event, handler) {
        this.emmiter.once(event, handler)
    }
}

// 导出
module.exports = new Mongodb(conf);