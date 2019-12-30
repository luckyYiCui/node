/*
 * @Author: your name
 * @Date: 2019-12-25 14:31:36
 * @LastEditTime : 2019-12-25 14:51:12
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\01-run.js
 */
const os = require('os')
const cpuStat = require('cpu-stat');

module.exports = function showMem() {
    const mem = os.freemem() / os.totalmem() * 100;
    console.log(`内存占用率${mem.toFixed(2)}`);

}
module.exports = function showCpu() {
    cpuStat.usagePercent((err, percent) => {
        console.log(`cpu占用率：${percent.toFixed(2)}`);
    });
}