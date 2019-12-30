/*
 * @Author: your name
 * @Date: 2019-12-25 16:24:06
 * @LastEditTime : 2019-12-26 09:13:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\01\07-httpClass.js
 */
const http = require('http');
const url = require('url');
const ora = require('ora')
const router = [];
class application {
    get(path, handler) {
        router.push({
            path,
            method: 'get',
            handler
        })
    }
    listen() {
        const server = http.createServer((req, res) => {

        })
        server.listen(...arguments);
    }
}

module.exports = function createApplication() {
    return new application();
}