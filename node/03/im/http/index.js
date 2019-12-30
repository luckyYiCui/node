/*
 * @Author: your name
 * @Date: 2019-12-26 10:35:51
 * @LastEditTime : 2019-12-26 11:14:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\03\im\http\index.js
 */
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path')

app.use(bodyParser.json());

const list = ['ccc', 'ddd']

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'))
})

app.get('/list', (req, res) => {
    res.end(JSON.stringify(list))
})

app.post('/send', (req, res) => {
    list.push(req.body.message)
    res.end(JSON.stringify(list))
})

app.post('/clear', (req, res) => {
    list.length = 0
    res.end(JSON.stringify(list))
})

app.listen(3000);