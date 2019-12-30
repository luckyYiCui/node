/*
 * @Author: your name
 * @Date: 2019-12-25 14:48:20
 * @LastEditTime : 2019-12-26 10:12:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\01\fs.js
 */
const fs = require('fs');
// 1.同步获取文件
const data = fs.readFileSync('./02-cpumen-export.js');
//console.log(data)


(async() => {
    // 2.异步获取文件
    fs.readFile('./02-cpumen-export.js', (err, data) => {
        // console.log(data.toString())
    })

    // 3.promisify异步获取文件
    const { promisify } = require('util');
    const readFile = promisify(fs.readFile);

    readFile('./02-cpumen-export.js').then(data => {
        // console.log('promise返回数据' + data)
    })

    // 4.async -  await异步获取文件
    const data = await readFile('./02-cpumen-export.js');
    console.log(data);
})()