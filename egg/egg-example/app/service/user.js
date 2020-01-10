/*
 * @Author: your name
 * @Date: 2020-01-09 16:22:30
 * @LastEditTime : 2020-01-09 16:25:53
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \121231\egg\egg-example\app\server\user.js
 */
const Service = require('egg').Service
class UserService extends Service {
    async getAll() {
        return [
            { name: 'service..' }
        ]
    }
}
module.exports = UserService