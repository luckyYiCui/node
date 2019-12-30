/*
 * @Author: your name
 * @Date: 2019-12-25 16:16:03
 * @LastEditTime : 2019-12-25 16:22:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\01\06-express.js
 */
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.end('hellowword!!')
})
app.get('/users', (req, res) => {
    res.end(JSON.stringify({ name: 'marry' }))
})
app.listen(3000, () => {
    console.log('open the servers')
})