/*
 * @Author: your name
 * @Date: 2019-12-27 16:04:57
 * @LastEditTime : 2019-12-27 16:07:03
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\04\mongodb\events.js
 */
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
// 监听
event.on('some_event', (num) => {
    console.log('event' + num)
})
var num = 0;
setInterval(() => {
    event.emit('some_event', num++)
}, 1000);