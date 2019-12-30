/*
 * @Author: your name
 * @Date: 2019-12-26 09:55:43
 * @LastEditTime : 2019-12-26 10:09:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\01\promise\promisify.js
 */
module.exports = function promisify(fn) {
    return function(...args) {
        return new Promise(function(resolve, reject) {
            args.push(function(err, ...arg) {
                if (err) {
                    reject(err)
                } else {
                    resolve(...arg);
                }
            });
            fn.apply(null, args);
        })
    }
}