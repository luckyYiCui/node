/*
 * @Author: your name
 * @Date: 2019-12-25 15:02:59
 * @LastEditTime : 2019-12-25 15:07:56
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\01\04-buffer.js
 */
const buffer = Buffer.alloc(10);
const buffer1 = Buffer.from([0, 1, 2]);
console.log(buffer, buffer1);

const buffer2 = Buffer.concat([buffer, buffer1]);
console.log(buffer2);

buffer.write('hello world!');
console.log(buffer.toString());